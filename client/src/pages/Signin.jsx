import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react';
import logo from '/coding-html-svgrepo-com.svg';
import { useDispatch , useSelector } from "react-redux";
import {signInFailure , signInStart , signInSuccess } from '../redux/user/userSlice.js';
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {

    const [formData,setformData] = useState({});
    const {loading , error : errormessage} = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) =>{
      setformData({...formData , [e.target.id] : e.target.value.trim() })
    };

    const handleSubmit = async (e) =>{
      e.preventDefault();
      if(!formData.email || !formData.password){
        return dispatch(signInFailure('Please fill out all the fields!'));
      }

      try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type' : 'application/json'},
          body: JSON.stringify({
            "email" : formData.email,
            "password" : formData.password
          }),
          redirect : "follow",

        });
        const data = await res.json();
        if(data.success == false){
          dispatch(signInFailure(data.message));
        }

        if(res.ok){
          dispatch(signInSuccess(data));
          navigate('/');
        }
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    }

  return (
    <div className="min-h-screen mt-20 text-l">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10">

        {/* left */}
        <div className="flex flex-col ">
          <Link style={{display : "flex" }} className="font-bold dark:text-white text-4xl" to="/">
            <img  src={logo} className="mr-3 h-6 sm:h-9" alt="Debugify Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Debugify
            </span>
          </Link>
          <p className="text-l mt-3">
            Debugify the onestop solution to all your bugs.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div >
              <Label value="Your Email"/>
              <TextInput type="email" placeholder="username@company.com" id="email" onChange={handleChange}/>
            </div>
            <div >
              <Label value="Your Password"/>
              <TextInput type="password" placeholder="*********" id="password" onChange={handleChange} />
            </div>
            {/* <Button type="submit" gradientMonochrome='lime'>Sign Up</Button> */}
            <button type="submit" className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-orange-900" disabled = {loading} >
              {
                loading ? ( 
                <>
                  <Spinner size='sm'/>
                  <span className="pl-3">Loading...</span>
                </>) : "Sign In"
              }
            </button>
            <OAuth/>
          </form>

          <div className="flex-0 gap-2 text-sm mt-5 text-center">
            <span>Don't have an account? </span>
            <Link to='/sign-up' className="text-blue-500">Sign Up</Link>
          </div>

          {
            errormessage && (
              <Alert className="mt-5" color='failure'>{errormessage} </Alert>
            )
          }

        </div>
      </div>
    </div>
  );
};

export default SignIn;
