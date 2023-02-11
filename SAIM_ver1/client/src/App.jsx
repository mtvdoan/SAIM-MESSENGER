// client/src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <Chat user={user} />
      ) : (
        <>
          <Login setUser={setUser} />
          <Register setUser={setUser} />
        </>
      )}
    </div>
  );
};

export default App;
