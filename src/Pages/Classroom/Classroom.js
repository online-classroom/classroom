import React from 'react'
import './Classroom.scss'
import VideoContainer from './../../Containers/VideoContainer/VideoContainer'
import QueueChatContainer from './../../Containers/QueueChatContainer/QueueChatContainer'

const Classroom =()=>{
    return(
        <div className='classroom_main'>
            <div className='video_qchat_container'>
                <div className='video_container'>
                    <VideoContainer/>
                </div>
                <div className='qchat_container'>
                    <QueueChatContainer/>
                </div>
            </div>
            <div className='bonus_description_container'>
                <div className='bonus_container'>
                    Bonus
                </div>
                <div className='description_container'>
                    Lecture Description 
                </div>
            </div>
        </div>
    )
}

export default Classroom