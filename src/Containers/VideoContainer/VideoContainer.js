import React,{useEffect} from "react";
import { connect } from "react-redux";
import TeacherStream from "./../../Components/Streams/TeacherStream/TeacherStream";
import StudentStream from "./../../Components/Streams/StudentStream/StudentStream";
import Axios from "axios";
import {updateUser} from './../../ducks/reducer'

const VideoContainer = (props) => {
  const { is_teacher, token, session_id, socket, queue} = props;
  
  return (
    <div style={{width: '100%', height: '100%'}}>
      {console.log({queue})}
      {is_teacher ? <TeacherStream  token={token} session_id={session_id} queue={queue} socket={socket} /> : <StudentStream token={token} session_id={session_id} queue={queue} socket={socket}/>}
    </div>
  );
};

const m2p = state => {
  const { is_teacher } = state;
  return {
    is_teacher
  };
};

export default connect(
  m2p,
  {updateUser}
)(VideoContainer);
