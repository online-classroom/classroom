import React , {useState,useEffect,memo} from 'react'
import Chat from '../../Components/QueueChat/Chat';
import Queue from '../../Components/QueueChat/Queue';
import SecondaryButton from './../../Components/Buttons/SecondaryButton';
import {connect} from 'react-redux';
import './QueueChatContainer.scss'




const QueueChatContainer = (props) => {
    const [showChat, setShowChat] = useState(true)
    

    const {user_id,course_id,is_teacher,socket,queue, messages, unreadQueue, setUnreadQueue, setUnreadMessage, unreadMessage} = props
    
    return (
        <div>
            <div>
                <SecondaryButton onClick={()=>{
                    setShowChat(true)
                    setUnreadMessage(false)
                }} isActive={showChat}>Chat {unreadMessage && <div id='dot'></div>}</SecondaryButton>
                <SecondaryButton onClick={()=>{
                    setShowChat(false)
                    setUnreadQueue(false)
                }} isActive={!showChat}>Queue {unreadQueue && <div id='dot'></div>}</SecondaryButton>
            </div>
            {showChat ? (
                <Chat user_id={user_id} course_id={course_id} socket={socket} queue={queue} messages={messages} is_teacher={is_teacher} />
            ):(
                <Queue user_id={user_id} course_id={course_id} socket={socket} queue={queue} messages={messages} is_teacher={is_teacher} />
            )}
        </div>
    )


}

const m2p = (state) => {
    const {user_id,is_teacher} = state
    return{
        user_id,
        is_teacher
    }
}

export default memo(connect(m2p,null)(QueueChatContainer))

