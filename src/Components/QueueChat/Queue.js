import React, { useState, memo } from 'react';
import './Queue.scss';
import SecondaryButton from './../Buttons/SecondaryButton';
import PrimaryButton from './../Buttons/PrimaryButton';
import ScrollToBottom from 'react-scroll-to-bottom';

const Queue = props => {
  const [question, handleQuestion] = useState('');

  const { user_id, course_id, socket, queue, is_teacher } = props;

  const joinQueue = e => {
    if (e.which === 13) {
      socket.emit('join queue', { user_id, course_id, question });
      handleQuestion('');
    }
  };

  const toggleVideo = (user_id, course_id, display) => {
    socket.emit('toggle video', { user_id, course_id, display });
  };

  const queueMapper = queue.map((queueItem, i) => {
    return (
      <div key={i}>
        <p>{queueItem.question}</p>
        {is_teacher && queueItem.display === false ? (
          <SecondaryButton
            onClick={() =>
              toggleVideo(queueItem.user_id, queueItem.course_id, true)
            }
          >
            See Stream
          </SecondaryButton>
        ) : (
          is_teacher && (
            <SecondaryButton
              onClick={() =>
                toggleVideo(queueItem.user_id, queueItem.course_id, false)
              }
            >
              Hide Stream
            </SecondaryButton>
          )
        )}
      </div>
    );
  });

  const isUserInQueue = id => {
    const finder = queue.filter(queueItem => {
      return queueItem.user_id === id;
    });

    if (finder.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const leaveQueue = () => {
    socket.emit('leave queue', { user_id, course_id });
  };

  return (
    <div>
      <ScrollToBottom className='messageWrapper'>{queueMapper}</ScrollToBottom>
      {isUserInQueue(user_id) && (
        <PrimaryButton onClick={leaveQueue}>Leave Queue</PrimaryButton>
      )}
      {!is_teacher && !isUserInQueue(user_id) && (
        <input
          className='input_message_field'
          onChange={e => handleQuestion(e.target.value)}
          value={question}
          onKeyDown={e => joinQueue(e)}
          placeholder='Type in a question. Enter to ask.'
        />
      )}
    </div>
  );
};

export default memo(Queue);
