import React, { useEffect, useState } from "react";

import { OTPublisher, OTSubscriber, createSession } from "opentok-react";

import './TeacherStream.scss'
import Axios from "axios";

const TeacherStream = props => {
  const [streams, setStreams] = useState([]);
  const [publish,setPublish] = useState(false)
  const [lectures,setLectures] = useState([])
  const { session_id, token, course_id} = props;

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
    
    getLectures()
    return () => {
      sessionHelper.disconnect();
    };
  }, []);

  const getLectures = async()=>{
    const lRes = await Axios.get(`/info/lectures/course/${course_id}`)
    setLectures(lRes.data)
  }

  const mappedStreams = streams.map(stream => {
    return (
      <OTSubscriber
        key={stream.id}
        session={sessionHelper.session}
        stream={stream}
      />
    );
  })

  const mappedLectures = lectures.map((lecture)=>{
    return(
      <p>
        {lecture.lecture_description}     
      </p>
    )
  })

  const startStream = () => {
    setPublish(true)

  }

  const stopStream = () => {
    setPublish(false)
  }

  return (
    <div className='teacherStream'>
    {publish
      ? <div> 
      <OTPublisher properties={{width: '100%', height: '58vh'}} session={sessionHelper.session} />
      {mappedStreams}
      <PrimaryButton onClick={stopStream}>End Lecture</PrimaryButton>
      </div>
      : <div>
        {mappedLectures}
        <PrimaryButton onClick={startStream}>Start Lecture</PrimaryButton>
      </div>
    }
    </div>
  );
};



export default TeacherStream;
