// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentCredentials, staffCredentials, adminCredentials } from '../../assets/data';
import './Login.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    let user = studentCredentials.find(
      (user) => user.username === username && user.password === password
    );
    if (!user) {
      user = staffCredentials.find(
        (user) => user.username === username && user.password === password
      );
    }
    if (!user) {
      user = adminCredentials.find(
        (user) => user.username === username && user.password === password
      );
    }

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem('userType', user.username === 'admin1' ? 'admin' : user.username === 'staff1' ? 'staff' : 'student');
      navigate(`/${user.username === 'admin1' ? 'admin' : user.username === 'staff1' ? 'staff' : 'student'}`);
    } else {
      setError('Invalid credentials, please try again!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
