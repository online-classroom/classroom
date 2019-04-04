import React, { useEffect, useState } from "react";
import PrimaryButton from "./../../Buttons/PrimaryButton";

import { OTPublisher, OTSubscriber, createSession } from "opentok-react";

import "./TeacherStream.scss";
import Axios from "axios";
import SecondaryButton from "../../Buttons/SecondaryButton";

const TeacherStream = props => {
  const [streams, setStreams] = useState([]);
  const [publish, setPublish] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState({});
  const [record, setRecord] = useState(false);
  const { session_id, token, course_id } = props;
  const [source, setSource] = useState("");

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
    getLectures();
    return () => {
      sessionHelper.disconnect();
    };
  }, []);

  const getLectures = async () => {
    const lRes = await Axios.get(`/info/lectures/course/${course_id}`);
    setLectures(lRes.data);
  };

  const mappedStreams = streams.map(stream => {
    return (
      <OTSubscriber
        key={stream.id}
        session={sessionHelper.session}
        stream={stream}
      />
    );
  });

  const mappedLectures = lectures
    .filter(lecture => lecture.archive_id === null)
    .map((lecture, i) => {
      return (
        <SecondaryButton
          key={i}
          onClick={() => setSelectedLecture(lecture)}
          isActive={selectedLecture === lecture}
        >
          <div
            dangerouslySetInnerHTML={{ __html: lecture.lecture_description }}
          />
        </SecondaryButton>
      );
    });

  const mappedRecordedLectures = lectures
    .filter(lecture => lecture.archive_id !== null)
    .map((lecture, i) => {
      return (
        <p key={i}>
          <div
            dangerouslySetInnerHTML={{ __html: lecture.lecture_description }}
          />
        </p>
      );
    });

  const startStream = async () => {
    if (Object.keys(selectedLecture).length === 0) {
      return alert("You must select a lecture to start streaming");
    } else {
      if (record) {
        const startRecording = await Axios.post(`/archive/record/start`, {
          session_id,
          lecture_id: selectedLecture.lecture_id,
          description: selectedLecture.lecture_description
        });
      }
      setPublish(true);
    }
  };

  const stopStream = async () => {
    setPublish(false);
    const stopRecording = await Axios.post(`/archive/record/stop`, {
      lecture_id: selectedLecture.lecture_id
    });
    window.location.reload();
  };

  return (
    <div className="teacherStream">
      {publish ? (
        <div>
          {source === "screen" ? (
            <OTPublisher
              properties={{
                width: "100%",
                height: "58vh",
                name: "Teacher",
                videoSource: "screen"
              }}
              session={sessionHelper.session}
            />
          ) : (
            <OTPublisher
              properties={{ width: "100%", height: "58vh", name: "Teacher" }}
              session={sessionHelper.session}
            />
          )}
          {mappedStreams}
          <PrimaryButton onClick={stopStream}>End Lecture</PrimaryButton>
          <SecondaryButton
            isActive={source === "screen"}
            onClick={() => setSource("screen")}
          >
            Screen
          </SecondaryButton>
          <SecondaryButton
            isActive={source === ""}
            onClick={() => setSource("")}
          >
            Camera
          </SecondaryButton>
        </div>
      ) : (
        <div>
          <div className="display-option">
            <p>Choose Display:</p>
            <SecondaryButton
              isActive={source === "screen"}
              onClick={() => setSource("screen")}
            >
              Screen
            </SecondaryButton>
            <SecondaryButton
              isActive={source === ""}
              onClick={() => setSource("")}
            >
              Camera
            </SecondaryButton>
          </div>
          <div className="lectures-list-container">
            <div className="lectures-list">
              <p>Scheduled Lectures:</p>
              <div>{mappedLectures}</div>
            </div>
            <div className="lectures-list">
              <p>Recorded Lectures:</p>
              <div>{mappedRecordedLectures}</div>
            </div>
          </div>
          <div className="start-recording">
            <p id="recording-instruction">Check to record this lecture</p>
            <input
              type="checkbox"
              onChange={() => setRecord(!record)}
              value={record}
              id='record-checkbox'
            />
          </div>
            <div className='start-lecture-button'><PrimaryButton onClick={startStream}>Start Lecture</PrimaryButton></div>
        </div>
      )}
    </div>
  );
};

export default TeacherStream;
