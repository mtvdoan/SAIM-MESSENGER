import React from 'react'
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
const LoginPage = () => {
    const navigate = useNavigate();
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userData = JSON.parse(localStorage.getItem(data.email));
    if (userData) { // getItem can return actual value or null
      if (userData.password === data.password) {
        console.log(userData.screenName + " You Are Successfully Logged In");
        alert("Thanks for logging in!");
        navigate("/chat");
      } else {
        console.log("Email or Password is not matching with our record");
      }
    } else {
      console.log("Email or Password is not matching with our record");
    }
    
  };
  return (
    <>
      <p className="title">Login Form</p>

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register("email", { required: true })} />
        {errors.email && <span style={{ color: "red" }}>
         *Email* is mandatory </span>}
        <input type="password" placeholder="Password" {...register("password")} />
        <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
      </form>
    </>
  );
}

export default LoginPage