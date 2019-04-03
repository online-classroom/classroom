import React, { useEffect, useState } from "react";
import Axios from "axios";


const LectureVideos = props => {
  const { course_id } = props;
  const [archiveUrls,setArchiveUrls] = useState([])

  useEffect(()=>{

    getLectureVideos()

  },[])

  const getLectureVideos = async() =>{

    const aRes =  await Axios.get(`/archive/course/videos/${course_id}`)

    setArchiveUrls(aRes.data)

  }
  
  
  const mappedLectureVideos = archiveUrls.map(archiveObj => {
    return (
      <video controls src={archiveObj.archive_url}/>
    );
  });

  return <div>{mappedLectureVideos}</div>;
};

export default LectureVideos;
