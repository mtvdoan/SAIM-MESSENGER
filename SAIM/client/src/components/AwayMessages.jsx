import React, {useState, useEffect} from 'react'
import Chat from './Chat';
import logo1 from '../images/logo1.png';
import aolemoji from '../images/aolemoji.png';
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
            <div className="m-auto">
                <header className="p-1 bg-blue-800 text-white text-center">
                    <div className="flex justify-center max-h-7  mr-0 w-auto">
                    <h1 className="font-extrabold text-gray-900 md:text-2xl  dark:text-white">📟  Register to 💬 SAIM-MESSENGER 😂 ! </h1>
                    <img className="p-0 m-0 align-right flex m-auto" style={{height: "100px", width: "150px"}} src={aolemoji} alt="aolemoji"/>
                    </div>
                    <p class="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">A millennial's utopia.</p>
                </header>
            <main class="m-auto max-w-m">
                <div class="m-auto shadow-xl sm:rounded-lg">
                    <table class="text-sm text-blue-900 ">
                        <thead class="text-sm text-white uppercase bg-blue-600">                
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
                                <th scope="col" className="px-16 py-3">
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
                                <td className=" px-20 py-4">
                                    {(() => {
                                        return  JSON.stringify(awayMessage.awayMessageCreator) === screenName ?
                                            <>
                                                <button className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-2 border border-blue-700 rounded"> Edit
                                                </button>
                                                <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-2 border border-blue-700 rounded"> Delete
                                                </button>
                                            </>
                                            :
                                        null
                                    })()}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                            </div>
                            <button onClick={handleLogOutClick} className="m-2 btn-xl bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Log Out</button>
                    </main>
            </div>
        </>
    )
}

export default AwayMessages;