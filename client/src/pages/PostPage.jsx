import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button, Spinner } from "flowbite-react";
import CommentSection from "../components/CommentSection";
import moment from 'moment';
import { HiUser, HiCalendar, HiClock, HiTag, HiDocumentText, HiEye, HiChat, HiArrowLeft, HiExclamationCircle } from 'react-icons/hi';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setrecentPosts] = useState(null);
  const [postuser, setPostUser] = useState({});
  const [readingTime, setReadingTime] = useState(0);

  // Calculate reading time based on content
  const calculateReadingTime = (content) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Get category color
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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setloading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setloading(false);
        } else {
          const fetchedPost = data.posts[0];
          setPost(fetchedPost);
          setReadingTime(calculateReadingTime(fetchedPost.content));
          setloading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setloading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/user/getuser/${post.userId}`);
        const data = await res.json();
        if (res.ok) {
          setPostUser(data);
        }
        else {
          console.log("Error fetching user");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (post != null)
      fetchUser();
  }, [post]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/post/getposts?limit=6`);
        const data = await res.json();
        if (res.ok) {
          // Filter out current post
          const filteredPosts = data.posts.filter(p => p.slug !== postSlug);
          setrecentPosts(filteredPosts.slice(0, 5));
        }
      }
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, [postSlug]);

  if (loading === true)
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-400/30 to-primary-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Spinner size="xl" className="text-primary-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading article...</p>
          </div>
        </div>
      </div>
    );

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400/30 to-orange-400/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400/30 to-red-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8">
              <HiExclamationCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Post Not Found</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The article you're looking for doesn't exist or has been removed.
              </p>
              <Link
                to="/questions"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <HiArrowLeft className="w-4 h-4 mr-2" />
                Browse Questions
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-400/30 to-primary-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header Navigation */}
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/questions"
            className="inline-flex items-center px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
          >
            <HiArrowLeft className="w-4 h-4 mr-2" />
            Back to Questions
          </Link>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            {/* Article Header */}
            <article className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 mb-8 shadow-2xl hover:shadow-primary-500/10 transition-all duration-300">
              {/* Category Badge */}
              <div className="mb-6">
                <Link to={`/search?category=${post && post.category}`}>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post && post.category)} hover:scale-105 transition-all duration-300 cursor-pointer`}>
                    <HiTag className="w-3 h-3 mr-1" />
                    {post && post.category}
                  </span>
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-secondary-600 dark:from-white dark:via-primary-400 dark:to-secondary-400 bg-clip-text text-transparent leading-tight mb-6">
                {post && post.title}
              </h1>

              {/* Author & Meta Information */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {postuser.profilePicture ? (
                      <img 
                        src={postuser.profilePicture} 
                        alt={postuser.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {postuser.username ? postuser.username.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">Asked by</span>
                      <span className="font-semibold text-primary-600 dark:text-primary-400">
                        {postuser.username || 'Anonymous'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <div className="flex items-center">
                        <HiCalendar className="w-3 h-3 mr-1" />
                        {post && moment(post.createdAt).fromNow()}
                      </div>
                      {post && post.updatedAt !== post.createdAt && (
                        <div className="flex items-center">
                          <HiClock className="w-3 h-3 mr-1" />
                          Updated {moment(post.updatedAt).fromNow()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reading Time & Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <HiDocumentText className="w-4 h-4 mr-1" />
                    {readingTime} min read
                  </div>
                  {post && post.views && (
                    <div className="flex items-center">
                      <HiEye className="w-4 h-4 mr-1" />
                      {post.views} views
                    </div>
                  )}
                </div>
              </div>

              {/* Article Content */}
              <div className="mt-8">
                <div className="ql-snow">
                  <div 
                    className="ql-editor post-content prose prose-lg dark:prose-invert max-w-none" 
                    dangerouslySetInnerHTML={{ __html: post && post.content }}
                  />
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 mb-8 shadow-2xl">
              <div className="flex items-center mb-6">
                <HiChat className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Discussion</h2>
              </div>
              <CommentSection postId={post && post.id} />
            </div>

            {/* Related Questions */}
            {recentPosts && recentPosts.length > 0 && (
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <HiDocumentText className="w-6 h-6 text-secondary-600 mr-3" />
                  Related Questions
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {recentPosts.map((onepost) => (
                    <Link
                      key={onepost.id}
                      to={`/post/${onepost.slug}`}
                      className="group p-4 bg-gray-50/50 dark:bg-gray-900/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 mb-2 line-clamp-2">
                        {onepost.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(onepost.category)}`}>
                          {onepost.category}
                        </span>
                        <span className="flex items-center">
                          <HiCalendar className="w-3 h-3 mr-1" />
                          {moment(onepost.createdAt).fromNow()}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Link
                    to="/questions"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <HiDocumentText className="w-4 h-4 mr-2" />
                    Explore More Questions
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostPage;
