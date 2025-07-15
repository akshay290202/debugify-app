import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react';
import logo from '/coding-icon-blue.svg';
import OAuth from "../components/OAuth";
import { useToast } from '../components/Toast';

const Signup = () => {

    const [formData,setformData] = useState({});
    const [errormessage,seterrormessage] = useState(null);
    const [loading,setloading] = useState(false);
    const navigate = useNavigate();
    const { showSuccess } = useToast();
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
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type' : 'application/json'},
          body: JSON.stringify({
            "username" : formData.username,
            "email" : formData.email,
            "password" : formData.password
          }),
          credentials: 'include',
          redirect : "follow",

        });
        const data = await res.text();
        if(data.success == false){
          return seterrormessage(data.message);
        }
        setloading(false);
        if(res.ok){
          showSuccess("Account created successfully! Please sign in to continue.", "Welcome to Debugify");
          navigate('/sign-in');
        }
      } catch (error) {
        seterrormessage(error.message);
        setloading(false);

      }
    }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-green-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl p-8 lg:p-12 hover:shadow-primary-500/10 transition-all duration-300">
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side - Brand Section */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-4 group mb-8"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img src={logo} className="h-8 w-8" alt="Debugify Logo" />
                  </div>
                  <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Debugify
                  </span>
                </Link>
                
                <div className="space-y-4">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                    Join Our Community!
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0">
                    Create your account and become part of the developer community. Share knowledge, solve problems, and grow together.
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 hidden lg:block">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Free to join, always</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Share and discover solutions</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Learn from experienced developers</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="w-full">
              <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-600/30 rounded-2xl p-8 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300">
                
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    Create Your Account
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Join thousands of developers sharing knowledge
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <TextInput 
                        type="text" 
                        placeholder="Enter your full name" 
                        id="username" 
                        onChange={handleChange}
                        className="w-full border-gray-200/50 dark:border-gray-600/50 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:border-green-500 focus:ring-green-500/20 transition-all duration-300"
                        icon={() => (
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <TextInput 
                        type="email" 
                        placeholder="Enter your email address" 
                        id="email" 
                        onChange={handleChange}
                        className="w-full border-gray-200/50 dark:border-gray-600/50 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:border-green-500 focus:ring-green-500/20 transition-all duration-300"
                        icon={() => (
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <TextInput 
                        type="password" 
                        placeholder="Create a strong password" 
                        id="password" 
                        onChange={handleChange}
                        className="w-full border-gray-200/50 dark:border-gray-600/50 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:border-green-500 focus:ring-green-500/20 transition-all duration-300"
                        icon={() => (
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full relative inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-medium text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg hover:from-green-600 hover:to-blue-600 focus:ring-4 focus:ring-green-300/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300"
                  >
                    {loading ? (
                      <>
                        <Spinner size='sm'/>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </>
                    )}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200/50 dark:border-gray-600/50" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white/70 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <OAuth/>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link 
                      to='/sign-in' 
                      className="font-medium bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-green-600 transition-all duration-300"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>

                {errormessage && (
                  <div className="mt-6 p-4 bg-red-50/80 dark:bg-red-900/20 border border-red-200/50 dark:border-red-700/50 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-red-600 dark:text-red-400">{errormessage}</span>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
