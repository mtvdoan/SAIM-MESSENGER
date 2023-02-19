import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
const UsersList = (props) => {
    // const { user, setUser, socket } = useContext(UserContext);
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/")
            .then((response) => {
                console.log("response", response);
                setUsersList(response.data.allUsers);
            })
            .catch((err) => console.log(err));
    }, []);
    const userScreenName =
        usersList.length > 0 &&
        usersList.map((user, index) => <p key={user.id}>{user.screenName}</p>);
    return (
        <>
            <div>
                <div
                    className="m-4 border-2 border-black-400 overflow-y-auto"
                    style={{ height: "400px" }}
                >
                    <div className="m-4 overflow-y-auto">
                        <p className="text-2xl font-extrabold">Buddies</p>
                        <div className="ml-10 text-2xl">{userScreenName}</div>
                    </div>
                </div>
                <div class="text-center">
                    <a href="#_" class="relative inline-block text-lg group">
                        <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-black">
                            <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                            <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-yellow-500 group-hover:-rotate-180 ease"></span>
                            <span class="relative">
                                <Link to="/awayMessages">Away Messages</Link>
                            </span>
                        </span>
                        <span
                            class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                            data-rounded="rounded-lg"
                        ></span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default UsersList;
