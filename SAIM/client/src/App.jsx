import "./App.css";
import Chat from './components/Chat';
import ChatRoomChoose from './components/ChatRoomChoose';
import io from "socket.io-client";
import React, {useState} from "react";

const socket = io.connect("http://localhost:3001");
// require database connection 


function App() {

  return (
    <div>
      <ChatRoomChoose/>
    </div>
  );
}

export default App;
