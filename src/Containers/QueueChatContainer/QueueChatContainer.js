import React , {useState,useEffect,memo} from 'react'
import Chat from '../../Components/QueueChat/Chat';
import Queue from '../../Components/QueueChat/Queue';
import SecondaryButton from './../../Components/Buttons/SecondaryButton';
import {connect} from 'react-redux';




const QueueChatContainer = (props) => {
    const [showChat, setShowChat] = useState(true)
    

    const {user_id,course_id,is_teacher,socket,queue, messages} = props
    
    return (
        <div>
            <div>
                <SecondaryButton onClick={()=>setShowChat(true)} isActive={showChat}>Chat</SecondaryButton>
                <SecondaryButton onClick={()=>setShowChat(false)} isActive={!showChat}>Queue</SecondaryButton>
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

