import React,{useEffect} from "react";
import { connect } from "react-redux";
import TeacherStream from "./../../Components/Streams/TeacherStream/TeacherStream";
import StudentStream from "./../../Components/Streams/StudentStream/StudentStream";
import Axios from "axios";
import {updateUser} from './../../ducks/reducer'

const VideoContainer = (props) => {
  const { is_teacher, token, session_id } = props;
  
  useEffect(()=>{
    getUser()
  },[])
  
  const getUser = async() => {
    const uRes = await Axios.get(`/auth/user`)
    const user = uRes.data
    props.updateUser(user)
  }

  return (
    <>
      {is_teacher ? <TeacherStream token={token} session_id={session_id}/> : <StudentStream token={token} session_id={session_id}/>}
    </>
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
