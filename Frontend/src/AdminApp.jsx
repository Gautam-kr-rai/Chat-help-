// AdminApp.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './AdminApp.css';

const socket = io('http://localhost:5000');

function AdminApp() {
  const [chatRequests, setChatRequests] = useState([]);

  useEffect(() => {
    socket.on('chatRequest', ({ user }) => {
      setChatRequests((prevRequests) => {
        // Avoid duplicate requests
        if (prevRequests.some(request => request.user === user)) return prevRequests;
        return [...prevRequests, { user, accepted: false }];
      });
    });

    return () => {
      socket.off('chatRequest');
    };
  }, []);

  const acceptChat = (user) => {
    // Update the local state to mark the user as accepted
    setChatRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.user === user ? { ...request, accepted: true } : request
      )
    );

    // Emit an event to the server to accept the chat
    socket.emit('acceptChat', { admin: 'Admin', user });
    
    // Open a new window for the admin to start chatting with the accepted user
    window.open(`/admin/chat/${user}`, '_blank');
  };

  return (
    <div className="App2">
      <h1>Admin Chat</h1>
      <div>
        <h2>Pending Chat Requests</h2>
        {chatRequests.length === 0 && <p>No chat requests.</p>}
        <ul>
          {chatRequests.map((request, index) => (
            <li key={index}>
              {request.user}{' '}
              {request.accepted ? (
                <span>Accepted</span>
              ) : (
                <button className='Abtn' onClick={() => acceptChat(request.user)}>Accept</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminApp;
