
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, {useState} from 'react';
import {UserProvider} from './context/UserContext';
import Login from './components/Login';
import Register from './components/Register';
import CreateAwayMessage from './components/CreateAwayMessage';
import UpdateAwayMessage from './components/UpdateAwayMessage';
import ViewAwayMessage from './components/ViewAwayMessage';
import Chat from './components/Chat';
import io from 'socket.io-client';

function App() {
    const [authorized, setAuthorized] = useState("");
    
    return (
        <>
            <BrowserRouter>
                <UserProvider>
                    <Routes>
                        <Route>
                            <Route index element={<Login authorized= {authorized} setAuthorized={setAuthorized}/>}/>
                            <Route path="/register" element={<Register authorized= {authorized} setAuthorized={setAuthorized}/>}/>
                            <Route path="/chat" element={<Chat authorized= {authorized} setAuthorized={setAuthorized}/>}/>

                        </Route>
                    </Routes>
                </UserProvider>
            </BrowserRouter>
        </>
    );
}

export default App;