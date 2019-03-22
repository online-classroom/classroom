import React,{useEffect,useState} from 'react'
import './Classroom.scss'
import VideoContainer from './../../Containers/VideoContainer/VideoContainer'
import QueueChatContainer from './../../Containers/QueueChatContainer/QueueChatContainer'
import Axios from 'axios';

const Classroom =(props)=>{
    const {course_id} = props.match.params
    const [token,setToken] = useState('')

    useEffect(()=>{
        if(token===''){
            Axios.post(`/info/generatetoken/${course_id}`).then((token)=>{
                token = token.data
                setToken(token)
            })
        }
    })


    return(
        <div className='classroom_main'>
            <div className='video_qchat_container'>
                <div className='video_container'>
                    <VideoContainer token={token}/>
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