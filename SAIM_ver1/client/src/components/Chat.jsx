// client/src/components/Chat.js
import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const Chat = ({ user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:5000');
    socket.on('chat message', (msg) => setMessages((msgs) => [...msgs, msg]));
    return () => socket.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socketIOClient('http://localhost:5000').emit('chat message', `${user}: ${message}`);
    setMessage('');
  };

  return (
    <div>
      <h1>Welcome to the Chat Room, {user}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
