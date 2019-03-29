import React, { useEffect, useState } from "react";
import "./Classroom.scss";
import VideoContainer from "./../../Containers/VideoContainer/VideoContainer";
import QueueChatContainer from "./../../Containers/QueueChatContainer/QueueChatContainer";
import { connect } from "react-redux";
import { updateUser } from "./../../ducks/reducer";
import Axios from "axios";
import io from 'socket.io-client';



const socket = io()

const Classroom = props => {
  const { course_id } = props.match.params;
  const [token, setToken] = useState("");
  const [session_id, setSessionId] = useState("");
  const [queue,setQueue] = useState([])
  const [messages,setMessages] = useState([])

  useEffect(() => {
    if (token === "" || session_id === "") {
      Axios.post(`/info/generatetoken/${course_id}`).then(res => {
        setToken(res.data.token);
        setSessionId(res.data.session_id);
      });
    }    
  }, []);

  useEffect(()=>{
    socket.emit('join classroom',course_id)
    
    socket.on('classroom joined',(data)=>{
        setQueue(data.queue)
        setMessages(data.messages)
    })
  
    socket.on('queue joined',(queue)=>{
        setQueue(queue)
    })

    socket.on('messages updated',(messages)=>{
        setMessages(messages)
    })

    socket.on('queue left',(queue)=>{
        setQueue(queue)
    })

    socket.on('video toggled',(queue)=>{
        setQueue(queue)
    })

},[])



  return (
    <div className="classroom_main">
      <div className="video_qchat_container">
        <div className="video_container">
          {token && session_id && (
            <VideoContainer socket={socket} token={token} session_id={session_id} queue={queue} course_id={course_id} />
          )}
        </div>
        <div className="qchat_container">
          <QueueChatContainer socket={socket} course_id={course_id} queue={queue} messages={messages} />
        </div>
      </div>
      <div className="bonus_description_container">
        <div className="bonus_container">Bonus</div>
        <div className="description_container">Lecture Description</div>
      </div>
    </div>
  );
};

const m2p = state => {
  const { user_id } = state;

  return {
    user_id
  };
};

export default connect(
  m2p,
  { updateUser }
)(Classroom);
