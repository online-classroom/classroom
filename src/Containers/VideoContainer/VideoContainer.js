import React,{useEffect,useState, memo} from "react";
import { connect } from "react-redux";
import TeacherStream from "./../../Components/Streams/TeacherStream/TeacherStream";
import StudentStream from "./../../Components/Streams/StudentStream/StudentStream";
import {updateUser} from './../../ducks/reducer';
import LectureVideos from './../../Components/LectureVideos/LectureVideos';

const VideoContainer = (props) => {
  const { is_teacher, token, session_id, socket, queue, course_id} = props;
  const [webRTC,setWebRTC] = useState(false)

  useEffect(()=>{
    const isWebRTCSupported = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia ||
        window.RTCPeerConnection;

        if (window.navigator.userAgent.indexOf("Edge") > -1) {
            alert('Video Streaming is not allowed/compatible with your browser. Please switch to a browser that supports WebRTC or allow video/audio access to the website to continue streaming.');
        }

        if (isWebRTCSupported) {
            setWebRTC(true);
        }
        else {
          alert('Video Streaming is not allowed/compatible with your browser. Please switch to a browser that supports WebRTC or allow video/audio access to the website to continue streaming.');
        }
  })

  
  return (
    <div style={{width: '100%', height: '100%'}}>
    { webRTC 
    ?
      is_teacher ? <TeacherStream  course_id={course_id} token={token} session_id={session_id} queue={queue} socket={socket} /> : <StudentStream token={token} session_id={session_id} queue={queue} socket={socket} course_id={course_id}/>
    
      :
      <LectureVideos course_id={course_id} />
    }
    </div>
  );
};

const m2p = state => {
  const { is_teacher } = state;
  return {
    is_teacher
  };
};

export default memo(connect(
  m2p,
  {updateUser}
)(VideoContainer));
