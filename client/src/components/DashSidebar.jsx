import React from "react";
import { Sidebar } from "flowbite-react";
import { HiAnnotation, HiChartPie, HiDocumentText, HiOutlineArrowSmRight, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice.js";


const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout/', {
        method: "POST",
      });
      
      let data = await res.text();
      
      if (res.ok) { 
        console.log("Sign out successful:", data);
        dispatch(signOutSuccess());
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
      } else {
        console.log("Sign out failed:", data);
      }
    } catch (error) {
      console.log("Sign out error:", error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56" color="gray">
      <Sidebar.Items >
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          { currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item active = { tab === 'dash' || !tab}
              icon= {HiChartPie} as='div'>
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor="dark" as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=posts'>
            <Sidebar.Item
              active={tab === "posts"}
              icon={HiDocumentText}
              as='div'
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
            >
              Users
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=comments'>
            <Sidebar.Item
              active={tab === "comments"}
              icon={HiAnnotation}
              as='div'
            >
              Comments
            </Sidebar.Item>
          </Link>
          </>
          )}
          <Sidebar.Item  icon={HiOutlineArrowSmRight} className="cursor-pointer" onClick={handleSignOut}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
