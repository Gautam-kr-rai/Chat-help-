import React from 'react';

const Message = ({ from, message }) => {
  return (
    <div className={`message ${from}`}>
      <p>{message}</p>
    </div>
  );
};

export default Message;

