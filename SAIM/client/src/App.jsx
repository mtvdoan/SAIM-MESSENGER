import "./App.css";
import Chat from './components/Chat';
import io from "socket.io-client";
import React, {useState} from "react";
import { UserProvider } from "./context/UserContext";
import {BrowserRouter, Router, Routes, Route} from 'react-router-dom';
import UserRegistration from "./components/UserRegister";
import LoginPage from "./components/LoginPage";
function App() {

  return (
    <BrowserRouter>

        <Routes>
          <Route path="/register" element={<UserRegistration/>}/>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/chat" element={<Chat/>} />
          
        </Routes>
    </BrowserRouter>
  );
}

export default App;