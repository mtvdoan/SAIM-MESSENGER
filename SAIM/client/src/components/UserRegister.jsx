import React from 'react'
import "../App.css";
import { useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

const UserRegister = () => {
 const {register, handleSubmit, formState: { errors } } = useForm();
  const navigate= useNavigate();
  const onSubmit = (data) => {
    localStorage.setItem(data.email, JSON.stringify({ 
        screenName: data.screenName, password: data.password 
    }));
    console.log(JSON.parse(localStorage.getItem(data.email)));
        alert("Thanks for registering!");
        navigate("/login");
  };
  return (
    <>
      <p className="title">Registration Form</p>

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Screen Name" {...register("screenName")} />
        <input type="email" placeholder="email" {...register("email", { required: true })} />
        {errors.email && <span style={{ color: "red" }}>
        *Email* is mandatory </span>}
        <input type="password" placeholder="Password" {...register("password")} />
        <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  )
}

export default UserRegister