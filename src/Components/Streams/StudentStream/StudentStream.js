import React, { useState, useEffect } from "react";
import { OTPublisher, OTSubscriber, createSession } from "opentok-react";
import {connect} from 'react-redux'

const StudentStream = props => {
  const [streams, setStreams] = useState([]);
  const { session_id, token, socket, user_id, queue } = props;

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
    const finder = queue.filter(queueItem => {
      console.log({queueItem})
      return queueItem.user_id === user_id && queueItem.display;
    });
    
    if (finder.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {isUserVideoAllowed() && <OTPublisher session={sessionHelper.session} />}
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

const m2p = (state) => {
  const {user_id} = state
  return{
    user_id
  }
}


export default connect(m2p,null)(StudentStream);
