import React, { useState, useEffect } from "react";
import "./Queue.scss";
import io from 'socket.io-client';
import {connect} from 'react-redux'

const socket = io()

const Queue = props => {
  
  const [question,handleQuestion] = useState('')
  const [handRaised,handleHandleRaised] = useState(false)
  const [queue,setQueue] = useState([])
  
  const {user_id,course_id} = props
  
  useEffect(()=>{

    socket.emit('join classroom',course_id)

    socket.on('classroom joined',(queue)=>{
      setQueue(queue)
    })

    socket.on('queue joined',(queue)=>{
      setQueue(queue)
    })

  },[])

  const joinQueue = (e) =>{
    if(e.which===13){
      console.log('join queue')
      socket.emit('join queue',{user_id,course_id,question})
    }
  }

  const queueMapper = queue.map((queueItem,i)=>{
    return(
      <p key={i}>{queueItem.question}</p>      
    )
  })

  return (
  <div>
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

export default connect(m2p)(Queue);