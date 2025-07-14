import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { HiOutlineExclamationCircle, HiUser, HiMail, HiLockClosed, HiSparkles, HiPencil, HiTrash, HiPlus } from "react-icons/hi";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashProfile = () => {
  const dispatch = useDispatch();
  const  {currentUser, error ,loading} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [updateUserSuccess, setupdateUserSuccess] = useState(null);
  const [updateUserError, setupdateUserError] = useState(null);
  const [formData, setformData] = useState({});
  const [showModel, setshowModel] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setupdateUserError(null);
    setupdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setupdateUserError("No changes made");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(
        `/api/user/update/${currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          redirect: "follow",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setupdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setupdateUserSuccess("Updated Successfully!");
        setupdateUserError(data.message);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    setshowModel(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `/api/user/delete/${currentUser.id}`,
        {
          method: "DELETE",
          redirect: "follow",
        }
      );
      const data = await res.text();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
        console.log("User deleted successfully");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-primary-900/10 dark:to-secondary-900/10 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg border border-primary-200/50 dark:border-primary-800/50 rounded-full text-primary-700 dark:text-primary-300 font-medium mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <HiSparkles className="w-5 h-5 mr-2" />
            Profile Management
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            My Profile
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage your account settings and preferences in one beautiful place
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              
              {/* Profile Picture */}
              <div className="text-center mb-8">
                <div 
                  className="relative w-36 h-36 mx-auto mb-6 group cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Zoom>
                    <img
                      src={currentUser.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full border-4 border-gradient-to-r from-primary-500 to-secondary-500 shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </Zoom>
                  
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {currentUser.username}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {currentUser.email}
                </p>
                
                {/* User Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-primary-50 dark:bg-primary-900/30 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {currentUser.isAdmin ? 'Admin' : 'User'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Role</div>
                  </div>
                  <div className="bg-secondary-50 dark:bg-secondary-900/30 rounded-2xl p-4">
                    <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                      Active
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <HiPencil className="w-6 h-6 mr-3 text-primary-600" />
                Update Information
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <HiUser className="w-4 h-4 mr-2 text-primary-600" />
                    Username
                  </label>
                  <div className="relative">
                    <TextInput
                      type="text"
                      id="username"
                      placeholder="Enter your username"
                      defaultValue={currentUser.username}
                      onChange={handleChange}
                      className="w-full"
                      style={{
                        backgroundColor: 'transparent',
                        borderRadius: '12px',
                        border: '2px solid rgb(229 231 235 / 0.5)',
                      }}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <HiMail className="w-4 h-4 mr-2 text-primary-600" />
                    Email Address
                  </label>
                  <div className="relative">
                    <TextInput
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      defaultValue={currentUser.email}
                      onChange={handleChange}
                      className="w-full"
                      style={{
                        backgroundColor: 'transparent',
                        borderRadius: '12px',
                        border: '2px solid rgb(229 231 235 / 0.5)',
                      }}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <HiLockClosed className="w-4 h-4 mr-2 text-primary-600" />
                    New Password
                  </label>
                  <div className="relative">
                    <TextInput
                      type="password"
                      id="password"
                      placeholder="Enter new password"
                      onChange={handleChange}
                      className="w-full"
                      style={{
                        backgroundColor: 'transparent',
                        borderRadius: '12px',
                        border: '2px solid rgb(229 231 235 / 0.5)',
                      }}
                    />
                  </div>
                </div>

                {/* Update Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <HiPencil className="w-5 h-5" />
                        <span>Update Profile</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
              </form>

              {/* Action Buttons */}
              <div className="mt-8 space-y-4">
                <Link to="/create-post" className="block">
                  <button
                    type="button"
                    className="w-full group relative px-8 py-4 bg-gradient-to-r from-success-500 to-success-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-success-500/25 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <HiPlus className="w-5 h-5" />
                      <span>Create New Post</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-success-600 to-success-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </button>
                </Link>

                <button
                  onClick={() => setshowModel(true)}
                  className="w-full group relative px-8 py-4 bg-gradient-to-r from-danger-500 to-danger-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-danger-500/25 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <HiTrash className="w-5 h-5" />
                    <span>Delete Account</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-danger-600 to-danger-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
              </div>

              {/* Success/Error Messages */}
              {updateUserSuccess && (
                <div className="mt-6 p-4 bg-success-50 dark:bg-success-900/30 border border-success-200 dark:border-success-800 rounded-2xl">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center mr-3">
                      <HiSparkles className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-success-700 dark:text-success-300 font-medium">
                      {updateUserSuccess}
                    </p>
                  </div>
                </div>
              )}

              {updateUserError && (
                <div className="mt-6 p-4 bg-danger-50 dark:bg-danger-900/30 border border-danger-200 dark:border-danger-800 rounded-2xl">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-danger-500 rounded-full flex items-center justify-center mr-3">
                      <HiOutlineExclamationCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-danger-700 dark:text-danger-300 font-medium">
                      {updateUserError}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showModel}
          onClose={() => setshowModel(false)}
          popup
          size="md"
          className="backdrop-blur-sm"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="relative">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-danger-50 via-white to-danger-50 dark:from-danger-900/20 dark:via-gray-800 dark:to-danger-900/20 rounded-lg"></div>
              
              <div className="relative text-center p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-danger-500 to-danger-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <HiOutlineExclamationCircle className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Delete Account?
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  This action cannot be undone. All your posts, comments, and profile data will be permanently removed from our servers.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleDeleteUser}
                    className="px-8 py-3 bg-gradient-to-r from-danger-500 to-danger-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-danger-500/25 transition-all duration-300 hover:scale-105"
                  >
                    Yes, Delete Account
                  </button>
                  
                  <button
                    onClick={() => setshowModel(false)}
                    className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default DashProfile;
