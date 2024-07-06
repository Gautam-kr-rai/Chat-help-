import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserApp from './UserApp';
import AdminChat from './components/AdminChat';
import Signup from './Signup';
import Login from './Login';
import AdminApp from './AdminApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/AdminApp" element={<AdminApp />} />
        <Route path="/admin" element={<Signup />} />
        <Route path="/login" element={<Login/>}/>

        <Route path="/admin/chat/:user" element={<AdminChat />} />
        <Route path="/" element={<UserApp />} />
      </Routes>
    </Router>
  );
}

export default App;
