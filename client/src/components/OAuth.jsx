import React from 'react'
import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider, signInWithPopup , getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt : 'select_account'});
        try {
            const resultsFromGoogle = await signInWithPopup(auth , provider);
            const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/auth/google`,{
                method: 'POST',
                headers : { 'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    name : resultsFromGoogle.user.displayName,
                    email : resultsFromGoogle.user.email,
                    googlePhotoUrl : resultsFromGoogle.user.photoURL, 
                }),
                redirect : "follow",
            })
            const data = await res.json();
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <button 
      onClick={handleGoogleClick}
      className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl shadow-lg hover:bg-white/80 dark:hover:bg-gray-700/80 focus:ring-4 focus:ring-gray-300/50 dark:focus:ring-gray-600/50 transform hover:scale-[1.02] transition-all duration-300"
    >
      <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
        <AiFillGoogleCircle className='w-5 h-5 text-white' />
      </div>
      <span>Continue with Google</span>
    </button>
  )
}

export default OAuth