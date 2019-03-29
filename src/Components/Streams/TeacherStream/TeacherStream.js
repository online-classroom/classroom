import React, { useEffect, useState } from "react";

import { OTPublisher, OTSubscriber, createSession } from "opentok-react";

import './TeacherStream.scss'

const TeacherStream = props => {
  const [streams, setStreams] = useState([]);
  const { session_id, token} = props;

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

  const mappedStreams= streams.map(stream => {
    return (
      <OTSubscriber
        key={stream.id}
        session={sessionHelper.session}
        stream={stream}
      />
    );
  })

  return (
    <div className='teacherStream'> 
      <OTPublisher properties={{width: '100%', height: '58vh'}} session={sessionHelper.session} />
      {mappedStreams}
    </div>
  );
};



export default TeacherStream;
