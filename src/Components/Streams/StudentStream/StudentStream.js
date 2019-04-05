import React, { useState, useEffect, memo } from "react";
import { OTPublisher, OTSubscriber, createSession } from "opentok-react";
import {connect} from 'react-redux'
import './StudentStream.scss'
import * as logic from './StudentStreamLogic';
import LectureVideos from "../../LectureVideos/LectureVideos";

const StudentStream = props => {
  const [streams, setStreams] = useState([]);
  const { session_id, token, socket, user_id, queue, course_id } = props;

  const sessionHelper = createSession({
    apiKey: process.env.REACT_APP_OPENTOK_API_KEY,
    sessionId: session_id,
    token: token,
    onStreamsUpdated: streams => {
      setStreams(streams);
    }
  });
  // let sessionHelper = {}

  useEffect(() => {
    return () => {
      sessionHelper.disconnect();
    };
  }, []);

  const isUserVideoAllowed = () => {
    
    const finder = logic.finder(queue,user_id)

    if (finder.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  // const getLectureUrls = async() =>{

  //   const aRes =  await Axios.get(`/archive/course/videos/${course_id}`)

  //   let archiveUrls = aRes.data
  //   return archiveUrls

  // }

  if(streams.length===0){

    

    return(
    <div>
      <LectureVideos 
        course_id={course_id} />
    </div>
    )

  }



  return (
    <div className='mapped_streams_container'>
      {streams.map(stream => {
        if(stream.name==='Teacher'){  // for teachers
          return (
            <div className='teacher_stream_container'>              
              <OTSubscriber
                key={stream.id}
                session={sessionHelper.session}
                stream={stream}
                properties={{width: '100%', height: '72.5vh'}}
              />
            </div>
          )
        }
        else{                  //for students
          return (
            <div className='student_stream_container'>
              <OTSubscriber
                key={stream.id}
                session={sessionHelper.session}
                stream={stream}
                properties={{width: '35.5vh', height: '20vh', insertMode: 'append'}}
              />
            </div>
          ); 
        }
      })}

      {isUserVideoAllowed() && <OTPublisher session={sessionHelper.session} properties={{name:'Student'}}/>}

    </div>
  );
};

const m2p = (state) => {
  const {user_id} = state
  return{
    user_id
  }
}




export default memo(connect(m2p,null)(StudentStream));
