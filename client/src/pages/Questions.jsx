import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HiSearch, HiFilter, HiClock, HiUser, HiEye, HiChat, HiSparkles, HiTrendingUp, HiLightningBolt, HiCode } from "react-icons/hi";
import moment from 'moment';

const Questions = () => {
  const [posts, setrecentPosts] = useState(null);
  const [loading, setloading] = useState(true);
  const [showMore, setshowMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [users, setUsers] = useState({});
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    try {
      setloading(true);
      const fetchRecentPosts = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/post/getposts?limit=10`);
        const data = await res.json();
        if(res.ok){
          setrecentPosts(data.posts);
          setFilteredPosts(data.posts);
          setTotalPosts(data.totalPosts || data.posts.length);
          setloading(false);
          if(data.posts.length < 10){
            setshowMore(false);
          }
          
          // Fetch user data for each post
          const userIds = [...new Set(data.posts.map(post => post.userId))];
          fetchUsers(userIds);
        }
      }
      fetchRecentPosts();
    } catch (error) {
      setloading(false);
      console.log(error.message);
    }
  },[]);

  // Fetch user data for posts
  const fetchUsers = async (userIds) => {
    const userPromises = userIds.map(async (userId) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/user/getuser/${userId}`);
        const userData = await res.json();
        if (res.ok) {
          return { [userId]: userData };
        }
        return { [userId]: { username: 'Unknown User', profilePicture: null } };
      } catch (error) {
        return { [userId]: { username: 'Unknown User', profilePicture: null } };
      }
    });

    const userResults = await Promise.all(userPromises);
    const usersData = userResults.reduce((acc, userObj) => ({ ...acc, ...userObj }), {});
    setUsers(usersData);
  };

  // Filter posts based on search term
  useEffect(() => {
    if (posts) {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    setLoadingMore(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/post/getposts?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        const newPosts = [...posts, ...data.posts];
        setrecentPosts(newPosts);
        setFilteredPosts(newPosts);
        
        // Fetch users for new posts
        const newUserIds = [...new Set(data.posts.map(post => post.userId))];
        const existingUserIds = Object.keys(users);
        const missingUserIds = newUserIds.filter(id => !existingUserIds.includes(id));
        if (missingUserIds.length > 0) {
          fetchUsers(missingUserIds);
        }
        
        if(data.posts.length < 10){
          setshowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadingMore(false);
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    const categoryColors = {
      'javascript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'react.js': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'next.js': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'uncategorized': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      'default': 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
    };
    return categoryColors[category?.toLowerCase()] || categoryColors.default;
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-lg mb-3 w-3/4"></div>
              <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-lg w-1/2"></div>
            </div>
            <div className="h-6 w-20 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-4 w-16 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded"></div>
              <div className="h-4 w-16 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded"></div>
            </div>
            <div className="h-8 w-8 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading === true)
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-primary-900/20 dark:to-secondary-900/20">
        {/* Hero Section Skeleton */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 dark:from-primary-800 dark:via-primary-900 dark:to-secondary-800">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-secondary-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
            <div className="absolute -bottom-8 left-40 w-72 h-72 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative container mx-auto px-4 py-24">
            <div className="text-center">
              <div className="h-16 bg-gradient-to-r from-white/20 to-white/10 rounded-lg mb-6 mx-auto w-96 animate-pulse"></div>
              <div className="h-8 bg-gradient-to-r from-white/20 to-white/10 rounded-lg mb-8 mx-auto w-80 animate-pulse"></div>
              <div className="h-12 bg-gradient-to-r from-white/20 to-white/10 rounded-xl mb-8 mx-auto w-96 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <LoadingSkeleton />
        </div>
      </div>
    );

  // Calculate real stats
  const totalQuestions = totalPosts;
  const activeToday = filteredPosts ? filteredPosts.filter(post => 
    moment(post.createdAt).isAfter(moment().subtract(1, 'day'))
  ).length : 0;
  
  const uniqueAuthors = filteredPosts ? 
    new Set(filteredPosts.map(post => post.userId)).size : 0;

  const categories = filteredPosts ? 
    new Set(filteredPosts.map(post => post.category)).size : 0;

  const stats = [
    { number: totalQuestions, label: "Questions", icon: HiCode },
    { number: activeToday, label: "Today", icon: HiTrendingUp },
    { number: uniqueAuthors, label: "Contributors", icon: HiUser },
    { number: categories, label: "Categories", icon: HiLightningBolt }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-primary-900/20 dark:to-secondary-900/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 dark:from-primary-800 dark:via-primary-900 dark:to-secondary-800">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-secondary-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-medium mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <HiSparkles className="w-5 h-5 mr-2" />
              Developer Community Hub
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-pulse">
                Coding
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-100 via-pink-100 to-white bg-clip-text text-transparent">
                Questions
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover solutions, share knowledge, and connect with fellow developers in our thriving community
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <Icon className="w-8 h-8 text-white mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Latest Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? `Found ${filteredPosts?.length || 0} results for "${searchTerm}"` : 'Explore the most recent coding challenges and solutions'}
            </p>
          </div>

          {/* Questions Grid */}
          <div className="space-y-6">
            {filteredPosts && filteredPosts.map((onepost, index) => {
              const postUser = users[onepost.userId] || { username: 'Loading...', profilePicture: null };
              return (
                <Link
                  to={`/post/${onepost.slug}`}
                  key={onepost.id}
                  className="block group"
                >
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 dark:hover:bg-gray-800/90">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 mb-2 line-clamp-2">
                          {onepost.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            {postUser.profilePicture ? (
                              <img 
                                src={postUser.profilePicture} 
                                alt={postUser.username}
                                className="w-4 h-4 rounded-full mr-1"
                              />
                            ) : (
                              <HiUser className="w-4 h-4 mr-1" />
                            )}
                            {postUser.username}
                          </div>
                          <div className="flex items-center">
                            <HiClock className="w-4 h-4 mr-1" />
                            {moment(onepost.createdAt).fromNow()}
                          </div>
                        </div>
                      </div>
                      {onepost.category && (
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(onepost.category)}`}>
                          {onepost.category}
                        </div>
                      )}
                    </div>

                    {/* Post Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <HiEye className="w-4 h-4 mr-1" />
                          <span>Asked {moment(onepost.createdAt).fromNow()}</span>
                        </div>
                        {onepost.updatedAt !== onepost.createdAt && (
                          <div className="flex items-center">
                            <HiChat className="w-4 h-4 mr-1" />
                            <span>Updated {moment(onepost.updatedAt).fromNow()}</span>
                          </div>
                        )}
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <HiCode className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredPosts && filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiSearch className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No questions found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Try adjusting your search terms or browse all questions</p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Show More Button */}
          {showMore && filteredPosts && filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={handleShowMore}
                disabled={loadingMore}
                className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-2">
                  {loadingMore ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <HiTrendingUp className="w-5 h-5" />
                      <span>Load More Questions</span>
                    </>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Questions