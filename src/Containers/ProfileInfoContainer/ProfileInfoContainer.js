// Started by Joe - march -18 -2019
import React from 'react';
import './ProfileInfoContainer.scss';

export default function ProfileInfoContainer() {
  return (
    <div className='infoContainer'>
      <div className='toggleButtons'>
        <button>Student Info</button>
        <button>Course Info</button>
      </div>
      {/* // I will change this className below */}
      <div className='renderedComponent'>{'<Student Course COmp >'}</div>
    </div>
  );
}
