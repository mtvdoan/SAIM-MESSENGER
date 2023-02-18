import React, { useState, useEffect, useContext } from "react";
import {UserContext} from '../context/UserContext';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
const AwayMessageModal = (props) => {
      const { id } = useParams();
    const { user, setUser, socket } = useContext(UserContext);
    const [awayMessage, setAwayMessage] = useState({});
    const [awayMessagesList, setAwayMessagesList] = useState([]);
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();

     useEffect(() => {
        axios
            .get("http://localhost:8000/api/awayMessages/" + id)
            .then((res) => setAwayMessage(res.data))
            .catch((err) => console.log(err));
    }, []);
  return (
    <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>

                </div>
                {/*body*/}fdafds
                    
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
export default AwayMessageModal;