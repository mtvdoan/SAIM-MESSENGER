
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, {useState} from 'react';
import {UserProvider} from './context/UserContext';
import Login from './components/Login';
import Register from './components/Register';
import CreateAwayMessage from './components/CreateAwayMessage';
import UpdateAwayMessage from './components/UpdateAwayMessage';
import ViewAwayMessage from './components/ViewAwayMessage';


function App() {
    const [authorized, setAuthorized] = useState("");
    
    return (
        <>
            <BrowserRouter>
                <UserProvider>
                    <Routes>
                        <Route>
                            <Route index element={<Login authorized= {authorized} setAuthorized={setAuthorized}/>}/>
                        </Route>
                    </Routes>
                </UserProvider>
            </BrowserRouter>
        </>
    );
}

export default App;