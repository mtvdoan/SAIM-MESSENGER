import {useState, createContext} from 'react';
import io from 'socket.io-client';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [screenName, setScreenName] = useState({
        id: 0,
        screeName: "",
        room: ""
    })
    const [socket] = useState(() => io(":8000"))
    return (
        <UserContext.Provider value={{screenName, setScreenName, socket}}>
            {children}
        </UserContext.Provider>
    )
}

export  {UserProvider, UserContext}
