import "./App.css";
import Chat from './components/Chat';
import io from "socket.io-client";
import React, {useState} from "react";
import { UserProvider } from "./context/UserContext";
import {BrowserRouter, Router, Routes, Route} from 'react-router-dom';
import UserRegistration from "./components/UserRegister";
import LoginPage from "./components/LoginPage";
import AwayMessages from "./components/AwayMessages";
import windowsXp from "./images/windowsXp.jpeg"
// import useWebSocket from 'react-use-websocket';
// const WS_URL = 'ws://127.0.0.1:8000';

function App() {

  const [authorized, setAuthorized] = useState("");
  return (

    <div className="App">


      <BrowserRouter>
        <UserProvider>

          <Routes>
            <Route path="/" element={<LoginPage/>} default/>
            <Route path="/register" element={<UserRegistration/>}/>
            <Route path="/chat" element={<Chat/>} />
            <Route path="/awayMessages" element={<AwayMessages/>} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>

  );
}


export default App;