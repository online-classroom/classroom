import React,{useEffect, memo} from "react";
import { connect } from "react-redux";
import TeacherStream from "./../../Components/Streams/TeacherStream/TeacherStream";
import StudentStream from "./../../Components/Streams/StudentStream/StudentStream";
import {updateUser} from './../../ducks/reducer'

const VideoContainer = (props) => {
  const { is_teacher, token, session_id, socket, queue, course_id} = props;
  
  return (
    <div style={{width: '100%', height: '100%'}}>
      {is_teacher ? <TeacherStream  course_id={course_id} token={token} session_id={session_id} queue={queue} socket={socket} /> : <StudentStream token={token} session_id={session_id} queue={queue} socket={socket}/>}
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
