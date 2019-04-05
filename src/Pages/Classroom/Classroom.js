import React, { useEffect, useState, memo } from "react";
import "./Classroom.scss";
import VideoContainer from "./../../Containers/VideoContainer/VideoContainer";
import QueueChatContainer from "./../../Containers/QueueChatContainer/QueueChatContainer";
import Quiz from '../../Containers/Quiz/Quiz';
import { connect } from "react-redux";
import { updateUser } from "./../../ducks/reducer";
import Axios from "axios";
import io from "socket.io-client";
import SecondaryButton from "../../Components/Buttons/SecondaryButton";

const socket = io();

const Classroom = props => {
  const { course_id } = props.match.params;
  const [token, setToken] = useState("");
  const [session_id, setSessionId] = useState("");
  const [queue, setQueue] = useState([]);
  const [messages, setMessages] = useState([]);
  const [lectures,setLectures] = useState([{lecture_description:""}])
  const [selectedLecture,setSelectedLecture] = useState(0)
  const {user_id,is_teacher} = props

  useEffect(() => {
    
    checkPrivacy()
    
    getLectures()
    
    if (token === "" || session_id === "") {
      Axios.post(`/info/generatetoken/${course_id}`).then(res => {
        setToken(res.data.token);
        setSessionId(res.data.session_id);
      });
    }

  }, [props]);
  
  const getLectures = async() =>{
    
    try{
      const lRes = await Axios.get(`/info/lectures/course/${course_id}`)
      setLectures(lRes.data)
      setSelectedLecture(lRes.data.length-1)
    }catch(err){
      alert('Classroom does not exist')
      props.history.goBack()
    }
  
  }

  const checkPrivacy = async() =>{
    try{
      const lRes = await Axios.get(`/info/course/privacy/?user_id=${user_id}&is_teacher=${is_teacher}&course_id=${course_id}`)
    }catch{
        alert('Access Denied!')
        props.history.push('/dashboard')
    }
  }

  useEffect(() => {
    socket.emit("join classroom", course_id);

    socket.on("classroom joined", data => {
      setQueue(data.queue);
      setMessages(data.messages);
    });

    socket.on("queue joined", queue => {
      setQueue(queue);
    });

    socket.on("messages updated", messages => {
      setMessages(messages);
    });

    socket.on("queue left", queue => {
      setQueue(queue);
    });

    socket.on("video toggled", queue => {
      setQueue(queue);
    });
  }, []);

  return (
    <div className="classroom_main">
      <div className="video_qchat_container">
        <div className="video_container">
          {token && session_id && (
            <VideoContainer
              
              socket={socket}
              token={token}
              session_id={session_id}
              queue={queue}
              course_id={course_id}
            />
          )}
        </div>
        <div className="qchat_container">
          <QueueChatContainer
            socket={socket}
            course_id={course_id}
            queue={queue}
            messages={messages}
          />
        </div>
      </div>
      <div className="bonus_description_container">
        <div className="description_container">
          <h2>Lecture Description</h2>
          <SecondaryButton isActive={selectedLecture!==0} onClick={()=>{selectedLecture!==0 && setSelectedLecture(selectedLecture-1)}}>{'<'}</SecondaryButton>
          <SecondaryButton isActive={selectedLecture!==lectures.length-1} onClick={()=>{selectedLecture!==lectures.length-1 && setSelectedLecture(selectedLecture+1)}}>></SecondaryButton>
          {lectures.length!==0
            &&
          <div dangerouslySetInnerHTML={{ __html: lectures[selectedLecture].lecture_description }}/>
        }
        </div>
        <div className="bonus_container">
          {/* <Quiz /> */}
          More Exciting Features Coming Soon
        </div>
      </div>
    </div>
  );
};

const m2p = state => {
  const { user_id, is_teacher } = state;

  return {
    user_id,
    is_teacher
  };
};

export default memo(connect(
  m2p,
  { updateUser }
)(Classroom));
