import React from 'react'
import "../App.css";
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
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
      <p className="title">Registration Form</p>

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Screen Name" {...register("screenName", {required: true})} />
        {errors.email && <span style={{ color: "red" }}>
        *Email* is mandatory </span>}
        <input type="email" placeholder="email" {...register("email", { required: true })} />
        {errors.password && <span style={{ color: "red" }}>
        *Password* is mandatory </span>}
        <input type="password" placeholder="Password" {...register("password")} />
        <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  )
};
export default UserRegister;