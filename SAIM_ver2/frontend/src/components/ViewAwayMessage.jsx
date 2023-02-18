import { UserContext } from "../context/UserContext";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewAwayMessage = (props) => {
    // const { user, setUser, socket } = useContext(UserContext);
    const { id } = useParams();
    const [awayMessage, setAwayMessage] = useState([]);
    const [awayMessagesList, setAwayMessagesList] = useState([]);
    const navigate = useNavigate();
	const {usersList, setUsersList} = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/awayMessages/" + id)
            .then((res) => setAwayMessage(res.data))
            .catch((err) => console.log(err));
    }, []);
	// 	useEffect(() => {
    //     axios
    //         .get("http://localhost:8000/api/users/")
    //         .then((response) =>
    //             setUsersList(
    //                 response.data,
    //                 response.data.screenName,
    //                 console.log("All users:", response.data)
    //             )
    //         )
    //         .catch((err) => console.log(err));
    // }, []);
    const deleteAwayMessage = (awayMessageId) => {
        axios
            .delete("http://localhost:8000/api/awayMessages/" + awayMessageId)
            .then(() => {
                console.log(
                    "Successfully deleted an away message from backend"
                );
                removeFromDom(awayMessageId);
                navigate("/awayMessages");
            })
            .catch((err) =>
                console.log(
                    "Something went wrong trying to delete an away message",
                    err
                )
            );
    };

    const removeFromDom = (awayMessageId) => {
        setAwayMessage(awayMessagesList.filter((a) => a._id !== awayMessageId));

	// const handleLogOutClick = () => {
	// 	console.log(`${user.screenName} has been logged out.`);
	// 	alert(`${user.screenName} has been successfully logged out! 👋`);
	// 	navigate("/");
	// };


        return (
            <>
                {/* <div>
                    <div>
                        <div className="">
                            <nav className="whitespace-nowrap m-2 border-gray-200 px-2 sm:px-4 py-10 rounded-2xl shadow-2xl fill-indigo-400border-2  bg-blue-400">
                                <div className="container flex flex-wrap items-center justify-between mx-auto">
                                    <div className="flex items-center justify">
                                        <h1 className="text-5xl mr-44 font-extrabold text-white dark:text-white">
                                            SAIM - MESSENGER
                                        </h1>
                                    </div>
                                    <p className="tracking-tighter text-gray-900 md:text-lg dark:text-gray-400">
                                        <mark className="grid grid-cols-2 content-center m-auto m-4 p-4 bg-blue-800 rounded-xl shadow-lg h-28 w-80">
                                            <h1 className=" text-5xl font-extrabold text-white dark:text-white mt-10">
                                                @ {userScreenName}
                                            </h1>
                                            <img
                                                src={aolemoji}
                                                alt="aolemoji"
                                                style={{
                                                    height: "150px",
                                                    width: "200px",
                                                }}
                                            />
                                        </mark>
                                    </p>
                                </div>
                            </nav>
                        </div>
                        <div className="max-w-screen-md mx-auto text-center justify-center content-center m-auto inline">
                            <svg
                                aria-hidden="true"
                                className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                                viewBox="0 0 24 27"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                                    fill="currentColor"
                                />
                            </svg>
                            <h1 className="text-center max-w-full w-full text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
                                <span>🤔</span>
                                Remember
                                <mark className="px-2 text-black bg-blue-600 rounded dark:bg-yellow-400 m-6">
                                    Away 💨
                                </mark>
                                Messages?"
                            </h1>
                        </div> */}
						<h1>HJDFKLZAJSFDOIJFSDIOFSD</h1>
                        {/* <div className="p-4">
                            <div
                                className="rounded-lg shadow-2xl m-auto p-2 grid grid-col-2 content-center"
                                style={{ width: "1500px" }}
                            >
                                <div
                                    className="border-1 border-black bg-gray-300 m-2"
                                    style={{ width: "auto", height: "700px" }}
                                >
                                    <div
                                        className="text-xl h-12 p-4 font-extrabold dark:text-white bg-blue-500 border-black border-2"
                                        style={{ width: "auto" }}
                                    ></div>
                                    <div
                                        className=""
                                        style={{
                                            maxHeight: "400px",
                                            width: "auto",
                                            height: "800px",
                                        }}
                                    >
                                        <div
                                            className="border-2 whitespace-normal border-black overflow-auto p-2 m-4 bg-white"
                                            id="messages"
                                            style={{ maxHeight: "900px" }}
                                        >
                                            <div
                                                className="rt-body whitespace-normal m-2 card overflow-y-auto border-1 border-black"
                                                style={{
                                                    width: "auto",
                                                    height: "1500px",
                                                    overflow: "visible",
                                                    scrollbarWidth: "700px",
                                                    whitespace: "wrap",
                                                    maxHeight: "500px",
                                                }}
                                            >
                                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                                    <table className="w-full text-3xl text-left bg-white text-black">
                                                        <thead className="text-3xl text-center text-gray-700 uppercase bg-white text-black">
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-3"
                                                                >
                                                                    Away Message
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-6 py-3"
                                                                >
                                                                    Creator
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className=" p-6 py-3"
                                                                >
                                                                    Likes
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="px-6 py-4">
                                                                    <Link
                                                                        className="link-primary"
                                                                        to={
                                                                            "/awayMessages/" +
                                                                            awayMessage._id
                                                                        }
                                                                    >
                                                                        <h6>
                                                                            {
                                                                                awayMessage.awayMessageLabel
                                                                            }
                                                                        </h6>
                                                                    </Link>
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    {
                                                                        awayMessage.awayMessageCreator
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-4">
                                                                    <LikeButton />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <a
                                    href
                                    onClick={handleLogOutClick}
                                    className=" cursor-pointer relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
                                >
                                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                                        Log Out
                                    </span>
                                </a>
                            </div>
                        </div> */}
                    {/* </div>
                </div> */}
            </>
        );
    };
};
export default ViewAwayMessage;
