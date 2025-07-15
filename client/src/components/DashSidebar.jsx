import React from "react";
import { Sidebar } from "flowbite-react";
import { HiAnnotation, HiChartPie, HiDocumentText, HiOutlineArrowSmRight, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice.js";
import { useToast } from "./Toast";


const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const {currentUser} = useSelector(state => state.user);
  const [tab, setTab] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    if (isSigningOut) return; // Prevent multiple clicks
    
    try {
      setIsSigningOut(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/user/signout/`, {
        method: "POST",
        credentials: 'include',
      });
      
      let data = await res.text();
      
      if (res.ok) { 
        console.log("Sign out successful:", data);
        showSuccess("Successfully signed out!", "See you soon!");
        dispatch(signOutSuccess());
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
      } else {
        console.log("Sign out failed:", data);
        showError("Failed to sign out. Please try again.", "Sign Out Error");
      }
    } catch (error) {
      console.log("Sign out error:", error.message);
      showError("Network error occurred. Please check your connection.", "Connection Error");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Sidebar className="w-full md:w-56 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          { currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item 
                active={tab === 'dash' || !tab}
                icon={HiChartPie} 
                as='div'
                className="hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor="dark" 
              as='div'
              className="hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=posts'>
            <Sidebar.Item
              active={tab === "posts"}
              icon={HiDocumentText}
              as='div'
              className="hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
            >
              Posts
            </Sidebar.Item>
          </Link>
          { currentUser.isAdmin && (
            <>
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item
                active={tab === "users"}
                icon={HiOutlineUserGroup}
                as='div'
                className="hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
              >
                Users
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item
                active={tab === "comments"}
                icon={HiAnnotation}
                as='div'
                className="hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
              >
                Comments
              </Sidebar.Item>
            </Link>
            </>
          )}
          <Sidebar.Item  
            icon={HiOutlineArrowSmRight} 
            className={`cursor-pointer transition-all duration-200 ${
              isSigningOut 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
            }`}
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut ? 'Signing Out...' : 'Sign Out'}
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
