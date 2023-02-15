import React, {useState, useEffect} from 'react'
import Chat from './Chat';
import logo1 from '../images/logo1.png';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
const AwayMessages = (props) => {
    const[awayMessagesList, setAwayMessagesList] = useState([]);

    const creator = awayMessagesList.length > 0 && awayMessagesList.map((awayMessage, index) => (awayMessage.awayMessageCreator));
    console.log("awaymessages creators", creator);

    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const screenNameAndPassword = JSON.parse(localStorage.getItem(email));
    console.log("Chat.jsx:", email, screenNameAndPassword);
    const screenName = JSON.stringify(screenNameAndPassword["screenName"]) 

    console.log("current useer:", screenName);
    const handleLogOutClick = () => {
        const userData = JSON.parse(localStorage.getItem("loggedIn"));

        localStorage.removeItem('loggedIn');
        sessionStorage.removeItem('loggedIn');

        console.log(`${screenName} has been logged out.`);
        alert(`${screenName} has been successfully logged out! 👋`);
        navigate("/");
    };
    const deleteAwayMessage = (awayMessageId) => {
        axios
            .delete("http://localhost:8000/api/awayMessages" + awayMessageId)
            .then(() => {
                console.log('Successfully deleted away message from backend');
                alert(`Away message deleted`);
                removeFromDom(awayMessageId);
            })
            .catch(err => console.log("Something went wrong trying to delete pet", err))
    };

    const removeFromDom = (awayMessageId) => {
        setAwayMessagesList(awayMessagesList.filter(a => a._id !== awayMessageId))
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/awayMessages/")
            .then((response) => setAwayMessagesList(response.data, response.data.screenName, console.log("All Away Messages:", response.data)))
            .catch((err)=>console.log(err))

    }, []);

const  actionButton = () => {
    if(JSON.stringify(screenName) === JSON.stringify(creator)) {
        return <p>yes i am</p>
    } else{
        return <p>NOPE</p>
    }
};

    return (
    <>
        <nav className=" bg-blue m-auto px-2 sm:px-4  dark: bg-blue-800 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="center ">
                <h2 className="text-4xl col-start-1 font-extrabold text-white">Hi, @ {screenName} !</h2>
                <h2 className="text-2xl col-end-7 col-span-2 font-extrabold text-white tracking-widest">SAIM-MESSENGER</h2>
            </div>
            <p className="scale-75 mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">A space for millennials to chat and share hilarious away messages!</p>
        </nav>    
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-black dark:text-black">
            <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Away Message
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Created By Screen Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Likes
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                awayMessagesList.length > 0 && awayMessagesList.map((awayMessage, index) => (

                <tr key={awayMessage.id} className="bg-white border-b bg-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-blue-300">
                    <td className="px-6 py-4">
                        <Link className="link-primary" to ={"/awayMessages/" + awayMessage._id}><h6>{awayMessage.awayMessageLabel}</h6></Link>
                    </td>
                    <td className="px-6 py-4">
                        {awayMessage.awayMessageCreator}
                    </td>
                    <td className="px-6 py-4">
                        likes
                    </td>
                    <td className="px-6 py-4">
                        {/* {actionButton()} */}
                    </td>
                {(() => {
                    return  JSON.stringify(awayMessage.awayMessageCreator) === screenName ?
                    <td className="px-6 py-4">
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                            Delete
                        </button>
                    </td> 
                    :
                    <td className="px-6 py-4">
                        <p>I hate this</p>
                    </td>
                })()}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        <button onClick={handleLogOutClick} className="bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Log Out</button>
        </>
    )
}

export default AwayMessages;