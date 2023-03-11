import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { withCookies, Cookies } from "react-cookie";

const LogOutButton = (props) => {
    const { socket, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8000/api/logout", { withCredentials: true })
    //         .then((res) => {
    //             console.log("what is res", res);
    //             res.clearCookie("userToken");
    //             socket.disconnect();
    //             console.log("Logged out!");
    //             navigate("/");
    //         });
    // }, []);
    const handleLogout = (e) => {
        e.preventDefault();
        console.log("attempting to logout");
        axios
            .post(
                "http://localhost:8000/api/users/logout",
                {},
                { withCredentials: true }
            )
            .then((res) => {
                res.clearCookie("userToken");

                setUser(null);
                console.log("successful logout");
                window.location.href = "/";
            })
            .catch((err) => console.log("logout error: " + err));
    };
    return (
        <>
            <button onClick={handleLogout}>LogOut</button>
        </>
    );
};

export default LogOutButton;
