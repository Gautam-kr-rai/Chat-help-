// AdminChat.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import ChatBox from './ChatBox';
import '../App.css';

const socket = io('http://localhost:5000');

function AdminChat() {
  const { user } = useParams(); // Assuming user ID is passed as a URL parameter
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const admin = 'Admin'; // Replace with actual admin ID or name
  const room = `${user}_${admin}`; // Ensure the room name is unique

  useEffect(() => {
    // Join the room
    socket.emit('joinRoom', { room });

    // Listen for incoming messages
    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('receiveMessage');
    };
  }, [room]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    const newMessage = { room, message, from: 'admin' };
    socket.emit('sendMessage', newMessage);
    // setMessages((prevMessages) => [...prevMessages, { from: 'admin', message }]);
    setMessage('');
  };

  return (
    <div className="App">
      <h1>Admin Chat with {user}</h1>
      <ChatBox messages={messages} user="Admin" />
      <div>
        <input className='inu2'
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button className='sbtn' onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default AdminChat;
