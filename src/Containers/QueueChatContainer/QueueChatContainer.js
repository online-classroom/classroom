import React , {useState,useEffect} from 'react'
import Chat from '../../Components/QueueChat/Chat';
import Queue from '../../Components/QueueChat/Queue';
import SecondaryButton from './../../Components/Buttons/SecondaryButton';
import io from 'socket.io-client';
import {connect} from 'react-redux'

const socket = io()

const QueueChatContainer = (props) => {
    const [showChat, setShowChat] = useState(true)
    const [queue,setQueue] = useState([])
    const [messages,setMessages] = useState([])

    const {user_id,course_id} = props

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
    },[])

    return (
        <div>
            <div>
                {console.log(queue)}
                <SecondaryButton onClick={()=>setShowChat(true)} isActive={showChat}>Chat</SecondaryButton>
                <SecondaryButton onClick={()=>setShowChat(false)} isActive={!showChat}>Queue</SecondaryButton>
            </div>
            {showChat ? (
                <Chat user_id={user_id} course_id={course_id} socket={socket} queue={queue} messages={messages}/>
            ):(
                <Queue user_id={user_id} course_id={course_id} socket={socket} queue={queue} messages={messages}/>
            )}
        </div>
    )


}

const m2p = (state) => {
    const {user_id} = state
    return{
        user_id
    }
}

export default connect(m2p,null)(QueueChatContainer)

