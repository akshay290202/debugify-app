import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle, HiPencil, HiTrash, HiCalendar, HiTag, HiDocumentText, HiPlus, HiEye } from 'react-icons/hi';
import { useToast } from './Toast';

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { showSuccess } = useToast();
  const [userPosts, setuserPosts] = useState([]);
  const [loading, setloading] = useState(true);
  const [showMore, setshowMore] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [PostIdToDelete, setPostIdToDelete] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setloading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/post/getposts?userId=${currentUser.id}`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          setuserPosts(data.posts);
          setloading(false);
          if (data.posts.length < 12) {
            setshowMore(false);
          }
        }
      } catch (error) {
        setloading(false);
        console.log(error);
      }
    };
    fetchPosts();
  }, [currentUser.id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    setLoadingMore(true);
    try {
              const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/post/getposts?userId=${currentUser.id}&startIndex=${startIndex}`, {
          credentials: 'include'
        });
      const data = await res.json();
      if (res.ok) {
        setuserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 12) {
          setshowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadingMore(false);
  };

  const handleDeletePost = async () => {
    setshowModal(false);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/post/deletepost/${PostIdToDelete}/${currentUser.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.text();
      if (!res.ok) {
        console.log(data.message);
      }
      else {
        setuserPosts((prev) =>
          prev.filter((post) => post.id !== PostIdToDelete)
        )
        showSuccess("Post deleted successfully!", "Post Management");
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'React': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Python': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'CSS': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'HTML': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Database': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'AI/ML': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
      'DevOps': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
      'Mobile': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300'
    };
    return colors[category] || 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300';
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
                My Posts
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-gray-700 dark:text-white font-medium mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <HiDocumentText className="w-5 h-5 mr-2" />
              Content Management
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              My Posts
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Manage and organize your published content
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <HiDocumentText className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{userPosts.length}</div>
                <div className="text-gray-600 dark:text-gray-400">Total Posts</div>
              </div>
              
               {/* total posts in last 30 days implement this */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <HiCalendar className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userPosts.reduce((total, post) => {
                    const postDate = new Date(post.createdAt);
                    const today = new Date();
                    const diffTime = Math.abs(today - postDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return total + (diffDays <= 30 ? 1 : 0);
                  }, 0)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Latest Posts</div>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <HiTag className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {[...new Set(userPosts.map(post => post.category))].length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Categories</div>
              </div>
            </div>

            {/* Create New Post Button */}
            <Link to="/create-post" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300">
              <HiPlus className="w-5 h-5 mr-2" />
              Create New Post
            </Link>
          </div>

          {/* Posts Grid */}
          {userPosts.length > 0 ? (
            <>
              <div className="space-y-6">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Post Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </span>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <HiCalendar className="w-4 h-4 mr-1" />
                            {new Date(post.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <Link 
                          to={`/post/${post.slug}`}
                          className="block group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"
                        >
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <HiDocumentText className="w-4 h-4 mr-1" />
                            Published
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/update-post/${post.id}`}
                          className="inline-flex items-center px-4 py-2 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900/30 dark:hover:bg-primary-800/50 text-primary-600 dark:text-primary-400 rounded-lg transition-all duration-300 hover:scale-105 font-medium"
                        >
                          <HiPencil className="w-4 h-4 mr-2" />
                          Edit
                        </Link>
                        
                        <button
                          onClick={() => {
                            setshowModal(true);
                            setPostIdToDelete(post.id);
                          }}
                          className="inline-flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/50 text-red-600 dark:text-red-400 rounded-lg transition-all duration-300 hover:scale-105 font-medium"
                        >
                          <HiTrash className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
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
                      'Load More Posts'
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-12 max-w-md mx-auto">
                <HiDocumentText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Posts Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start sharing your knowledge with the community by creating your first post.
                </p>
                <Link
                  to="/create-post"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <HiPlus className="w-5 h-5 mr-2" />
                  Create Your First Post
                </Link>
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
                  Delete Post
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Are you sure you want to delete this post? This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    color="failure"
                    onClick={handleDeletePost}
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

export default DashPosts;
