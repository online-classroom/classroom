import React, { useEffect, useState, memo } from "react";
import Axios from "axios";
import './lectureVideos.scss'


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
      <div className='archived-video-container'>

        <video controls src={archiveObj.archive_url} className='archived-video-div'/>

        <div className='archived-video-description' dangerouslySetInnerHTML={{ __html: archiveObj.lecture_description }}/>

      </div>
    );
  });

  return (
    <div className='entire-archived-container'>
      <span className='browse-previous-lectures-text'>Browse previous lectures:</span>
      <div>{mappedLectureVideos}</div>
    </div>
  )
};

export default memo(LectureVideos);
