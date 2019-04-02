import React from 'react';

export function messageDisplay(messages) {
  const mapper = messages.map(message => {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '0 0 0 15px'
          }}
        >
          <p style={{ fontWeight: 'bold', margin: '0px' }}>
            {message.first_name} {message.last_name}
          </p>
          &ensp;
          <span style={{ fontSize: '12px', color: 'grey' }}>
            {message.time}
          </span>
        </div>
        <p style={{ margin: '10px 0px 30px 30px' }}>{message.message}</p>
      </div>
    );
  });

  return mapper;
}
