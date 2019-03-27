import React, { useEffect, useState } from "react";

import { OTPublisher, OTSubscriber, createSession } from "opentok-react";

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

  

  return (
    <div>
      <OTPublisher session={sessionHelper.session} />
      {streams.map(stream => {
        return (
          <OTSubscriber
            key={stream.id}
            session={sessionHelper.session}
            stream={stream}
          />
        );
      })}
    </div>
  );
};



export default TeacherStream;
