import React, { useState } from "react";

const Chat = (props) => {
  const [message,handleMessage] = useState('')
  const {socket,course_id,user_id, messages } = props

  const sendMessage=(e)=>{
    if(e.which===13){
      socket.emit('m2b',{user_id,course_id,message})
    }
  }

  const messagesMapper = messages.map((message)=>{
    return(
      <p>{message.message}</p>
    )
  })

  return (
    <div>
      {messagesMapper}
      <input value={message} placeholder='Enter message' onChange={(e)=>handleMessage(e.target.value)} onKeyDown={(e)=>sendMessage(e)}/>
    </div>
  );
};

export default Chat;
