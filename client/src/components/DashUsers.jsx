import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle, HiUser, HiMail, HiCalendar, HiShieldCheck, HiTrash, HiUsers, HiUserGroup, HiStar } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [showMore, setshowMore] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [userIdToDelete, setuserIdToDelete] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setloading(false);
          setusers(data.users);
          if (data.users.length < 9) {
            setshowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
        setloading(false);
      }
    };
    fetchUsers();
  }, [currentUser.id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setusers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setshowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadingMore(false);
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.text();
      if (res.ok) {
        setusers((prev) => prev.filter((user) => user.id !== userIdToDelete));
        setshowModal(false);
      }
      else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserInitials = (username) => {
    return username.slice(0, 2).toUpperCase();
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 animate-pulse">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );

  if (loading === true)
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-400/30 to-primary-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
                User Management
              </h1>
              <div className="flex justify-center">
                <Spinner size="xl" className="text-primary-600" />
              </div>
            </div>
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-400/30 to-primary-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-gray-700 dark:text-white font-medium mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <HiUsers className="w-5 h-5 mr-2" />
              Admin Dashboard
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              User Management
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Manage community members and administrators
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <HiUserGroup className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</div>
                <div className="text-gray-600 dark:text-gray-400">Total Users</div>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <HiShieldCheck className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter(user => user.isAdmin).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Administrators</div>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <HiUser className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter(user => !user.isAdmin).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Regular Users</div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <HiStar className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter(user => new Date(user.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">New This Week</div>
              </div>
            </div>
          </div>

          {/* Users Grid */}
          {currentUser.isAdmin && users.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    {/* User Header */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        {user.profilePicture ? (
                          <img 
                            src={user.profilePicture} 
                            alt={user.username}  
                            className="w-16 h-16 object-cover rounded-full border-2 border-white dark:border-gray-700 shadow-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {getUserInitials(user.username)}
                          </div>
                        )}
                        {user.isAdmin && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <HiShieldCheck className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                          {user.username}
                        </h3>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <HiMail className="w-4 h-4 mr-1" />
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Status:</span>
                        {user.isAdmin ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                            <FaCheck className="w-3 h-3 mr-1" />
                            Administrator
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            <FaCheck className="w-3 h-3 mr-1" />
                            Regular User
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Joined:</span>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <HiCalendar className="w-4 h-4 mr-1" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                                             <div className="text-xs text-gray-500 dark:text-gray-400">
                         ID: {String(user.id).slice(0, 8)}
                       </div>
                      
                      {user.id !== currentUser.id && (
                        <button
                          onClick={() => {
                            setshowModal(true);
                            setuserIdToDelete(user.id);
                          }}
                          className="inline-flex items-center px-3 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/50 text-red-600 dark:text-red-400 rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
                        >
                          <HiTrash className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More Button */}
              {showMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleShowMore}
                    disabled={loadingMore}
                    className="inline-flex items-center px-8 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 text-primary-600 dark:text-primary-400 font-medium rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <>
                        <Spinner size="sm" className="mr-2" />
                        Loading...
                      </>
                    ) : (
                      'Load More Users'
                    )}
                  </button>
                </div>
              )}
            </>
          ) : !currentUser.isAdmin ? (
            <div className="text-center py-12">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-12 max-w-md mx-auto">
                <HiShieldCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Access Denied</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You need administrator privileges to access user management.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-12 max-w-md mx-auto">
                <HiUsers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Users Found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No users are currently registered in the system.
                </p>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          <Modal
            show={showModal}
            onClose={() => setshowModal(false)}
            popup
            size="md"
            className="backdrop-blur-sm"
          >
            <Modal.Header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50" />
            <Modal.Body className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiOutlineExclamationCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Delete User
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Are you sure you want to delete this user? This action cannot be undone and will remove all their content.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    color="failure"
                    onClick={handleDeleteUser}
                    className="bg-red-600 hover:bg-red-700 focus:ring-red-300"
                  >
                    Yes, Delete
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => setshowModal(false)}
                    className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default DashUsers;
