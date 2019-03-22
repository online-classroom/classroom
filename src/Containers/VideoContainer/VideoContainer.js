import React from "react";
import Video1 from "../../Components/Video1/Video1";

const VideoContainer = (props) => {
  return (
    <div className="VideoContainer">
      <Video1 token={props.token}/>
    </div>
  );
};

export default VideoContainer;
