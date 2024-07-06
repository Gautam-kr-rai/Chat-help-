import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserApp from './UserApp';
import AdminApp from './AdminApp';
import AdminChat from './components/AdminChat';
import './index.css';
import Signup from './Signup';
import Login from './Login';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        
        <Route path="/admin" element={<Signup />} />
        <Route path="/AdminApp" element={<AdminApp />} />
        <Route path='/Login' element={<Login/>}/>
        <Route path="/admin/chat/:user" element={<AdminChat />} />
        <Route path="/" element={<UserApp />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

