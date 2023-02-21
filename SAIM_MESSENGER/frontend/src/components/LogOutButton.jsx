import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LogOutButton = (props) => {
    const {socket} = useContext(UserContext);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:8000/api/logout", {withCredentials:true})
            .then(() => {
                localStorage.removeItem("userDetails");
                console.log("Logged out!")
                socket.disconnect();
                navigate("/")
            })
    }, [])
    
    return(
        <>
            <button>
                LogOut
            </button>
        </>
    )
}


export default LogOutButton;