import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import  Comment  from './Comment';
import { useNavigate } from "react-router-dom"; 
import { HiOutlineExclamationCircle} from 'react-icons/hi';
import { Alert, Button, Modal, TextInput, Textarea } from "flowbite-react";
import { useToast } from './Toast';

const CommentSection = ({ postId }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { showSuccess } = useToast();
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState([]);
  const[showModal, setshowModal] = useState(false);
  const [commentToDelete , setcommentToDelete] = useState(null);
  const [commenterror, setcommenterror] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 300) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/comment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId: postId,
          userId: currentUser.id,
        }),
        credentials: 'include',
        redirect: "follow",
      });
      const data = await res.json();
      if (res.ok) {
        setcomment("");
        setcommenterror(null);
        setcomments((prevComments) => [data, ...prevComments]);
        showSuccess("Comment posted successfully!", "Success");
      }
    } catch (error) {
      setcommenterror(error.messsage);
    }
  };


  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/comment/getpostcomments/${postId}`, {
          credentials: 'include'
        });
        if (res.ok) {
          const data = await res.json();
          setcomments(data);
        }
      } catch (error) {
        console.log(error.messsage);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async(commentId) => {
    try {
      if(!currentUser){
        navigate('/sign-in');
        return;
      }

              const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/comment/likecomment/${commentId}`,{
        method : 'PUT',
        credentials: 'include',
      }); 

      if(res.ok){
        const data = await res.json();
        setcomments((prevComments) => prevComments.map((comment) => 
          comment.id === commentId ? {
            ...comment,
            likes : data.likes,
            numberOfLikes : data.likes.length,
          } : comment
        ))
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment,editedContent) => {
    setcomments((prevComments) =>
      prevComments.map((c) =>
      c.id === comment.id ? {...c , content : editedContent} : c
    ))
  };

  const handleDelete = async () => {
    if (!commentToDelete) {
      console.error('No comment selected for deletion');
      return;
    }

    setshowModal(false);
    try {
      if(!currentUser){
        navigate('/sign-in');
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/comment/deletecomment/${commentToDelete}`,{
        method : 'DELETE',
        credentials: 'include',
      });
      
      if(res.ok){
        setcomments((prevComments) => {
          const filteredComments = prevComments.filter((comment) => {
            const commentId = String(comment.id);
            const deleteId = String(commentToDelete);
            return commentId !== deleteId;
          });
          return filteredComments;
        });
        showSuccess("Comment deleted successfully!", "Success");
        setcommentToDelete(null); // Reset after successful deletion
      } else {
        console.error('Delete failed with status:', res.status);
      }
    } catch (error) {
      console.log('Delete error:', error.message);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto w-full p-6">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-pink-400/20 to-red-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl p-8 hover:shadow-primary-500/10 transition-all duration-300">
        
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Community Answers
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Share your knowledge and help fellow developers
          </p>
        </div>

        {currentUser ? (
          <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-600/30 rounded-xl p-4 mb-6 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <span className="text-sm font-medium">Signed in as</span>
              <div className="flex items-center gap-2">
                <img
                  className="h-8 w-8 object-cover rounded-full ring-2 ring-blue-500/30"
                  src={currentUser.profilePicture}
                  alt="user"
                />
                <Link
                  to={"/dashboard?tab=profile"}
                  className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                >
                  @{currentUser.username}
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 backdrop-blur-sm border border-orange-200/50 dark:border-orange-700/50 rounded-xl p-4 mb-6">
            <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <span>You must be signed in to answer.</span>
              <Link 
                to={"/sign-in"} 
                className="font-medium bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent hover:from-red-600 hover:to-orange-600 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

        {currentUser && (
          <div className="mb-8">
            <div className="mb-4">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                Share Your Answer
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Help the community by sharing your knowledge and experience
              </p>
            </div>
            
            <form
              onSubmit={handleSubmit}
              className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-orange-200/50 dark:border-orange-700/50 rounded-xl p-6 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300"
            >
              <div className="mb-4">
                <Textarea
                  placeholder="Share your knowledge and help fellow developers..."
                  rows="4"
                  maxLength="300"
                  onChange={(e) => setcomment(e.target.value)}
                  value={comment}
                  className="w-full border-gray-200/50 dark:border-gray-600/50 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <p className={`text-xs transition-colors duration-300 ${
                    300 - comment.length < 50 
                      ? 'text-red-500 font-medium' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {300 - comment.length} characters remaining
                  </p>
                  {300 - comment.length < 50 && (
                    <div className="text-xs text-red-500">
                      ⚠️ Approaching limit
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={comment.trim().length === 0}
                  className="relative inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-lg hover:from-orange-600 hover:to-red-600 focus:ring-4 focus:ring-orange-300/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300"
                >
                  <span>Submit Answer</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              
              {commenterror && (
                <div className="mt-4 p-4 bg-red-50/80 dark:bg-red-900/20 border border-red-200/50 dark:border-red-700/50 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-red-600 dark:text-red-400">{commenterror}</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {comments.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-600/30 rounded-xl p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No Answers Yet
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Be the first to share your knowledge and help the community! Your answer could make a difference.
              </p>
              {!currentUser && (
                <div className="mt-6">
                  <Link 
                    to="/sign-in"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Sign in to answer
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Community Answers
                  </h3>
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      {comments.length} {comments.length === 1 ? 'Answer' : 'Answers'}
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Latest answers first
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div 
                  key={comment.id}
                  className="group bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-600/30 rounded-xl p-6 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:border-gray-300/50 dark:hover:border-gray-500/50 transition-all duration-300 hover:shadow-lg"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <Comment 
                    comment={comment} 
                    onLike={handleLike} 
                    onEdit={handleEdit} 
                    onDelete={(commentId) => {
                      setshowModal(true);
                      setcommentToDelete(commentId);
                    }} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <Modal
          show={showModal}
          onClose={() => {
            setshowModal(false);
            setcommentToDelete(null);
          }}
          popup
          size="md"
          className="backdrop-blur-sm"
        >
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl">
            <Modal.Header className="border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                  <HiOutlineExclamationCircle className="h-6 w-6 text-red-500" />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Delete Answer
                </span>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center py-6">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiOutlineExclamationCircle className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    Delete This Answer?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                    This action cannot be undone. The answer will be permanently removed from the discussion.
                  </p>
                </div>
                
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleDelete}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-300/50 transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Yes, Delete
                  </button>
                  
                  <button
                    onClick={() => {
                      setshowModal(false);
                      setcommentToDelete(null);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-lg shadow-lg hover:bg-white/80 dark:hover:bg-gray-700/80 focus:ring-4 focus:ring-gray-300/50 transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                </div>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CommentSection;
