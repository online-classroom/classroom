// started by Joe - march 18 2019
import React, { Component } from 'react';
import './Dashboard.scss';
import ProfileInfoContainer from '../../Containers/ProfileInfoContainer/ProfileInfoContainer';
import Schedule from '../../Containers/Schedule/Schedule';
import ClassListContainer from '../../Containers/ClassListContainer/ClassListContainer';

export default class Dashboard extends Component {
  render() {
    return (
      <div className='dashboardMainPage'>
        <div className='dashContainer'>
          <ProfileInfoContainer />
          <Schedule />
        </div>
        <div className='courseListContainer'>
          <ClassListContainer />
        </div>
      </div>
    );
  }
}
