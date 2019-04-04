import React, { useState } from 'react';
import * as logic from './ChatLogic';
import './Queue.scss';

const Chat = props => {
  const [message, handleMessage] = useState('');
  const { socket, course_id, user_id, messages } = props;

  const sendMessage = e => {
    if (e.which === 13) {
      socket.emit('m2b', { user_id, course_id, message });
      handleMessage('')
    }
  };

  const messagesMapper = logic.messageDisplay(messages);

  return (
    <div className='queue'>
      <div className='messageWrapper'>{messagesMapper}</div>
      <br />
      <input
        className='input_message_field'
        value={message}
        placeholder='Enter message. Press Enter to send.'
        onChange={e => handleMessage(e.target.value)}
        onKeyDown={e => sendMessage(e)}
      />
      <br />
    </div>
  );
};

export default Chat;
