// started by Joe - march 18 2019
import React, { useEffect } from "react";
import "./Dashboard.scss";
import ProfileInfoContainer from "../../Containers/ProfileInfoContainer/ProfileInfoContainer";
import Schedule from "../../Containers/Schedule/Schedule";
import ClassListContainer from "../../Containers/ClassListContainer/ClassListContainer";

const Dashboard = () => {

  return (
    <div className="dashboardMainPage">
      <div className="dashContainer">
        <ProfileInfoContainer />
        <ClassListContainer />
      </div>
      <div className="courseListContainer">
        <Schedule />
      </div>
    </div>
  );
};


export default Dashboard;
