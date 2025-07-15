import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle, HiChat, HiHeart, HiCalendar, HiTrash, HiDocument, HiUser, HiAnnotation, HiChatAlt2, HiThumbUp } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setcomments] = useState([]);
  const [loading, setloading] = useState(true);
  const [showMore, setshowMore] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [commentIdToDelete, setcommentIdToDelete] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedComments, setExpandedComments] = useState(new Set());

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setloading(false);
          setcomments(data.Comments);
          if (data.Comments.length < 9) {
            setshowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
        setloading(false);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser.id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    setLoadingMore(true);
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setcomments((prev) => [...prev, ...data.Comments]);
        if (data.Comments.length < 9) {
          setshowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadingMore(false);
  };

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(`/api/comment/deletecomment/${commentIdToDelete}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        // Update the comments state immediately
        setcomments((prev) => {
          const filtered = prev.filter((comment) => comment.id !== commentIdToDelete);
          console.log(`Deleted comment ${commentIdToDelete}. Comments before: ${prev.length}, after: ${filtered.length}`);
          return filtered;
        });
        
        // Clear the states and close modal
        setshowModal(false);
        setcommentIdToDelete("");
      } else {
        const data = await res.json();
        console.log("Delete failed:", data.message);
      }
    } catch (error) {
      console.log("Error deleting comment:", error.message);
    }
  };

  const toggleCommentExpansion = (commentId) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const formatContent = (content) => {
    if (content.length <= 100) return content;
    return content.substring(0, 100) + "...";
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-1/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-full"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </div>
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
                Comment Management
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
              <HiChatAlt2 className="w-5 h-5 mr-2" />
              Content Moderation
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Comment Management
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Moderate and manage community discussions
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <HiChat className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{comments.length}</div>
                <div className="text-gray-600 dark:text-gray-400">Total Comments</div>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <HiThumbUp className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {comments.reduce((total, comment) => total + (comment.numberOfLikes || 0), 0)}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Total Likes</div>
              </div>
              
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <HiDocument className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {[...new Set(comments.map(comment => comment.postId))].length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Unique Posts</div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
                <HiUser className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {[...new Set(comments.map(comment => comment.userId))].length}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          {currentUser.isAdmin && comments.length > 0 ? (
            <>
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 hover:scale-[1.01] group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      {/* Comment Info */}
                      <div className="flex-1">
                        {/* Comment Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <HiCalendar className="w-4 h-4 mr-1" />
                            {new Date(comment.updatedAt).toLocaleDateString()}
                          </div>
                                                     <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                             <HiUser className="w-4 h-4 mr-1" />
                             User ID: {String(comment.userId).slice(0, 8)}
                           </div>
                           <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                             <HiDocument className="w-4 h-4 mr-1" />
                             Post ID: {String(comment.postId).slice(0, 8)}
                           </div>
                        </div>
                        
                        {/* Comment Content */}
                        <div className="mb-4">
                          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border-l-4 border-primary-500">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {expandedComments.has(comment.id) ? comment.content : formatContent(comment.content)}
                            </p>
                            {comment.content.length > 100 && (
                              <button
                                onClick={() => toggleCommentExpansion(comment.id)}
                                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium mt-2 transition-colors duration-200"
                              >
                                {expandedComments.has(comment.id) ? 'Show Less' : 'Read More'}
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {/* Comment Stats */}
                        <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <HiThumbUp className="w-4 h-4 mr-1 text-red-500" />
                            <span className="font-medium">{comment.numberOfLikes || 0}</span>
                            <span className="ml-1">likes</span>
                          </div>
                                                     <div className="flex items-center">
                             <HiAnnotation className="w-4 h-4 mr-1" />
                             <span>Comment ID: {String(comment.id).slice(0, 12)}</span>
                           </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end space-y-3">
                        <div className="flex items-center space-x-3">
                          
                          <button
                            onClick={() => {
                              setshowModal(true);
                              setcommentIdToDelete(comment.id);
                            }}
                            className="inline-flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/50 text-red-600 dark:text-red-400 rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
                          >
                            <HiTrash className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                        
                        {/* Engagement Badge */}
                        {comment.numberOfLikes > 0 && (
                          <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-pink-100 to-red-100 dark:from-pink-900/30 dark:to-red-900/30 text-pink-600 dark:text-pink-400 rounded-full text-xs font-medium">
                            <HiHeart className="w-3 h-3 mr-1" />
                            Popular Comment
                          </div>
                        )}
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
                      'Load More Comments'
                    )}
                  </button>
                </div>
              )}
            </>
          ) : !currentUser.isAdmin ? (
            <div className="text-center py-12">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-12 max-w-md mx-auto">
                <HiChat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Access Denied</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You need administrator privileges to access comment management.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-12 max-w-md mx-auto">
                <HiChatAlt2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Comments Yet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No comments have been posted yet. Check back later for community discussions.
                </p>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          <Modal
            show={showModal}
            onClose={() => {
              setshowModal(false);
              setcommentIdToDelete("");
            }}
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
                  Delete Comment
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Are you sure you want to delete this comment? This action cannot be undone and will permanently remove the comment from the discussion.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    color="failure"
                    onClick={handleDeleteComment}
                    className="bg-red-600 hover:bg-red-700 focus:ring-red-300"
                  >
                    Yes, Delete
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => {
                      setshowModal(false);
                      setcommentIdToDelete("");
                    }}
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

export default DashComments;
