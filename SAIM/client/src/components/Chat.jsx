import React, { useState } from 'react';
import io from 'socket.io-client';
import LoginPage from './LoginPage';
const Chat = (props)=> {
  const [roomNumber, setRoomNumber] = useState('');
  const [socket, setSocket] = useState(null);

  const [screenName, setScreenName] = useState('');
  const [messages, setMessages] = useState([]);

  const handleScreenNameChange = (event) => {
    setScreenName(event.target.value);
  };

  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSocket(io(`http://localhost:3001?room=${roomNumber}&screenName=${screenName}`));
  };

  const handleMessageChange = (event) => {
    setInput(event.target.value);
  };

  const [input, setInput] = useState('');

const handleMessageSubmit = (event) => {
  event.preventDefault();
  if (input) {
    socket.emit('chat message', { sender: screenName, message: input });
    setInput('');
  }
};

React.useEffect(() => {
  if (socket) {
    socket.on('chat message', (data) => {
      setMessages([...messages, data]);
    });
  }
}, [socket, messages]);

  return (
    <div>
      {!socket ? (
        <form onSubmit={handleSubmit}>
          <label>
            Screen Name:
            
            <input type="text" value={screenName} onChange={handleScreenNameChange} />
          </label>
          <label>
            Chat Room#:
            <input type="text" value={roomNumber} onChange={handleRoomNumberChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>User {screenName} is chatting in room #{roomNumber}</h2>
          <ul id="messages">
           {messages.map((message, index) => (
  <li key={index}>{message.sender}: {message.message}</li>
))}

          </ul>
          <form id="form" onSubmit={handleMessageSubmit}>
            <input id="input" autocomplete="off" value={input} onChange={handleMessageChange} />
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
