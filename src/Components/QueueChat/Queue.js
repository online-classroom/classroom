import React, { useState, useEffect } from "react";
import "./Queue.scss";

const Queue = props => {
  
  const [question,handleQuestion] = useState('')
  
  const {user_id,course_id,socket,queue} = props

  const joinQueue = (e) =>{
    if(e.which===13){
      socket.emit('join queue',{user_id,course_id,question})
      handleQuestion('')
    }
  }

  const queueMapper = queue.map((queueItem,i)=>{
    return(
      <p key={i}>{queueItem.question}</p>      
    )
  })

  return (
  <div>
    {console.log(queue)}
    {queueMapper}
    <input onChange={(e)=>handleQuestion(e.target.value)} value={question} onKeyDown={(e)=>joinQueue(e)}/>
  </div>
  );
};

const m2p = (state) => {
  const {user_id} = state
  return{
    user_id
  }
}

export default Queue;