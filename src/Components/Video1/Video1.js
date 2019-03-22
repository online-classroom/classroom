import React from "react";
import Video2 from "../Video2/Video2";
import Video3 from "../Video3/Video3";

const Video1 = (props) => {
  const {token} = props
  return (
    <div className="Video1">
      Video1
      {console.log(props.token)}
      <Video2 />
      <Video3 />
    </div>
  );
};

export default Video1;
