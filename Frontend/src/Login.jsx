// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await axios.post('http://localhost:5000/auth/login', { email, password });
      console.log(result);

      if (result.data.message === "Login successful") {
        navigate('/AdminApp');
      } else {
        setError(result.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        {error && <div className="alert alert-danger mt-3">{typeof error === 'string' ? error : JSON.stringify(error)}</div>}
      </form>
    </div>
  );
}

export default Login;

