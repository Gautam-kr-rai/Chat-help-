import React from 'react';
import './ChatBox.css';

const ChatBox = ({ messages, user }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.from === 'admin' ? 'admin-message' : 'user-message'}`}
        >
          <span className="message-text">{msg.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;



