import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3000/auth/register', { username, password });
      setMessage('Registered successfully');
    } catch (err) {
      setMessage('Error registering');
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', { username, password });
      setToken(res.data.access_token);
      setMessage('Logged in');
    } catch (err) {
      setMessage('Error logging in');
    }
  };

  return (
    <div>
      <h1>Login/Register</h1>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
      {token && <p>Token: {token}</p>}
      {/* Links to /products and /orders */}
    </div>
  );
};

export default Home;