import React from 'react'
import "../App.css";
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import logo1 from '../images/logo1.png'
import aolemoji from '../images/aolemoji.png'
const UserRegister = () => {
  
 const {register, handleSubmit, formState: { errors } } = useForm();
  const navigate= useNavigate();
  const onSubmit = (data) => {
     localStorage.setItem("email", data.email);
     console.log("printing out data email", data.email)
    localStorage.setItem(data.email, JSON.stringify({ 
        screenName: data.screenName, 
        password: data.password 
    
    }));
  console.log(JSON.parse(localStorage.getItem(data.email)));
    alert("Thanks for registering!");
    navigate("/");
  };


  return (
    <>
      <div className="m-auto align-center">
        <header class="p-1 bg-blue-800 text-white text-center">
            <div className="flex justify-center max-h-7  mr-0 w-auto">
              <h1 class="font-extrabold text-gray-900 md:text-2xl  dark:text-white">📟  Register to 💬 SAIM-MESSENGER 😂 ! </h1>
              <img className="p-0 m-0 align-right flex m-auto" style={{height: "100px", width: "150px"}} src={aolemoji} alt="aolemoji"/>
            </div>
            <p class="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">A millennial's utopia.</p>
        </header>
          <main class="m-auto">
              <div className="max-w-sm border-gray-500 shadow-xl p-4 m-auto">
                <img className="scale-75"src={logo1} alt="logo"/>
                <form className="App" onSubmit={handleSubmit(onSubmit)}>
                  <label className="block">
                    {errors.screenName && <span style={{ color: "red" }}>
                    *Screen Name* is mandatory </span>}
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 flex text-sm font-medium text-slate-700">
                        screenName!
                    </span>
                    <input type="text" placeholder="Screen Name" {...register("screenName", {required: true})} />
                  </label>         
                  <label className="block">
                    {errors.email && <span style={{ color: "red" }}>
                    *Email* is mandatory </span>}
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 flex text-sm font-medium text-slate-700">
                      eMail!
                    </span>
                    <input type="email" placeholder="Email" {...register("email", { required: true })} />
                  </label>         
                  <label className="block">
                    {errors.password && <span style={{ color: "red" }}>
                    *Password* is mandatory </span>}
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                      PaSsWoRd:
                    </span>
                    <input type="password" placeholder="Password" {...register("password")} />
                  </label>
                    <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
                </form>                  
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">SAIM MESSENGER™</a>. All Rights Reserved.  </span>
          </div>
          </main>
      </div>
    </>
  )
};
export default UserRegister;