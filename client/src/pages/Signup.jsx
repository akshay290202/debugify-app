import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react';
import logo from '/coding-html-svgrepo-com.svg';
import OAuth from "../components/OAuth";

const Signup = () => {

    const [formData,setformData] = useState({});
    const [errormessage,seterrormessage] = useState(null);
    const [loading,setloading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) =>{
      setformData({...formData , [e.target.id] : e.target.value.trim() })
    };

    const handleSubmit = async (e) =>{
      e.preventDefault();
      if(!formData.username || !formData.email || !formData.password){
        return seterrormessage('Please fill out all the fields!');
      }

      try {
        setloading(true);
        seterrormessage(null);
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type' : 'application/json'},
          body: JSON.stringify({
            "username" : formData.username,
            "email" : formData.email,
            "password" : formData.password
          }),
          redirect : "follow",

        });
        const data = await res.text();
        if(data.success == false){
          return seterrormessage(data.message);
        }
        setloading(false);
        if(res.ok){
          navigate('/sign-in');
        }
      } catch (error) {
        seterrormessage(error.message);
        setloading(false);

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
            <div>
              <Label value="Your Username"/>
              <TextInput type="text" placeholder="Tony Stark" id="username" onChange={handleChange}/>
            </div>
            <div >
              <Label value="Your Email"/>
              <TextInput type="email" placeholder="username@company.com" id="email" onChange={handleChange}/>
            </div>
            <div >
              <Label value="Your Password"/>
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            {/* <Button type="submit" gradientMonochrome='lime'>Sign Up</Button> */}
            <button type="submit" className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-orange-900" disabled = {loading} >
              {
                loading ? ( 
                <>
                  <Spinner size='sm'/>
                  <span className="pl-3">Loading...</span>
                </>) : "Sign Up"
              }
            </button>
            <OAuth/>
          </form>

          <div className="flex-0 gap-2 text-sm mt-5 text-center">
            <span>Already have an account? </span>
            <Link to='/sign-in' className="text-blue-500">Sign In</Link>
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

export default Signup;
