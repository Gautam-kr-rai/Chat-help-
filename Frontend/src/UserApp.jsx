import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatBox from './components/ChatBox';
import './App.css';

const socket = io('http://localhost:5000');

function UserApp() {
  const [messages, setMessages] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('User1'); // Changeable user ID for testing

  useEffect(() => {
    socket.on('chatAccepted', ({ admin }) => {
      setAdmin(admin);
      setChatStarted(true);
      const room = `${user}_${admin}`; // Ensure the room name is unique
      socket.emit('joinRoom', { room });
    });

    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chatAccepted');
      socket.off('receiveMessage');
    };
  }, [user]);

  const requestChat = () => {
    socket.emit('requestChat', { user });
  };

  const sendMessage = () => {
    if (message.trim() === '') return;
    const newMessage = { room: `${user}_${admin}`, message, from: 'user' }; // Ensure the room name is used

    socket.emit('sendMessage', newMessage);
    // setMessages((prevMessages) => [...prevMessages, { from: 'user', message }]);
    setMessage('');
  };

  return (
    <div className="App">
      <h1>Chat with Us</h1>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter user ID"
      />
      {!chatStarted ? (
        <button onClick={requestChat}>Start Chat</button>
      ) : (
        <div>
          <ChatBox messages={messages} user={user} />
          <div>
            <input className='inu'
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
            />
            <button className='sbtn' onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserApp;
