import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Table } from 'flowbite-react';
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup, HiTrendingUp, HiEye } from "react-icons/hi";

const DashboardComp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.Comments);
          setTotalComments(data.total);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchAllData = async () => {
      setIsLoading(true);
      if (currentUser.isAdmin) {
        await Promise.all([fetchUsers(), fetchComments(), fetchPosts()]);
      }
      setIsLoading(false);
    };

    fetchAllData();
  }, [currentUser]);

  const StatCard = ({ title, value, growth, icon: Icon, gradient, delay = 0 }) => (
    <div 
      className="card-hover p-6 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {title}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {isLoading ? (
              <div className="loading-skeleton h-8 w-20"></div>
            ) : (
              value.toLocaleString()
            )}
          </p>
        </div>
        <div className={`p-3 rounded-2xl ${gradient} shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {isLoading ? (
          <div className="loading-skeleton h-4 w-24"></div>
        ) : (
          <>
            <div className="flex items-center px-2 py-1 bg-success-100 dark:bg-success-900/30 rounded-full">
              <HiTrendingUp className="w-4 h-4 text-success-600 dark:text-success-400" />
              <span className="text-sm font-semibold text-success-600 dark:text-success-400 ml-1">
                {growth}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Last Month</span>
          </>
        )}
      </div>
    </div>
  );

  const LoadingSkeleton = ({ rows = 5 }) => (
    <div className="space-y-4">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <div className="loading-skeleton h-10 w-10 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="loading-skeleton h-4 w-3/4"></div>
            <div className="loading-skeleton h-3 w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const DataTable = ({ title, link, children, delay = 0 }) => (
    <div 
      className="card p-6 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <Link to={link} className="btn-outline text-sm px-4 py-2">
          <HiEye className="w-4 h-4 mr-2" />
          View All
        </Link>
      </div>
      
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );

  if (!currentUser.isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            You need admin privileges to view this dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={totalUsers}
          growth={lastMonthUsers}
          icon={HiOutlineUserGroup}
          gradient="bg-gradient-to-br from-primary-500 to-primary-600"
          delay={0}
        />
        <StatCard
          title="Total Posts"
          value={totalPosts}
          growth={lastMonthPosts}
          icon={HiDocumentText}
          gradient="bg-gradient-to-br from-secondary-500 to-secondary-600"
          delay={100}
        />
        <StatCard
          title="Total Comments"
          value={totalComments}
          growth={lastMonthComments}
          icon={HiAnnotation}
          gradient="bg-gradient-to-br from-success-500 to-success-600"
          delay={200}
        />
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Users */}
        <DataTable 
          title="Recent Users" 
          link="/dashboard?tab=users"
          delay={300}
        >
          <div className="space-y-4">
            {users && users.map((user, index) => (
              <div 
                key={user.id} 
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                style={{ animationDelay: `${350 + index * 50}ms` }}
              >
                <img 
                  src={user.profilePicture} 
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DataTable>

        {/* Recent Comments */}
        <DataTable 
          title="Recent Comments" 
          link="/dashboard?tab=comments"
          delay={400}
        >
          <div className="space-y-4">
            {comments && comments.map((comment, index) => (
              <div 
                key={comment.id} 
                className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                style={{ animationDelay: `${450 + index * 50}ms` }}
              >
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">
                  {comment.content}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    by {comment.user?.username || 'Unknown'}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                      {comment.numberOfLikes}
                    </span>
                    <span className="text-xs text-gray-400">likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DataTable>
      </div>

      {/* Recent Posts - Full Width */}
      <div className="mt-6">
        <DataTable 
          title="Recent Posts" 
          link="/dashboard?tab=posts"
          delay={500}
        >
          <div className="space-y-4">
            {posts && posts.map((post, index) => (
              <div 
                key={post.id} 
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
                style={{ animationDelay: `${550 + index * 50}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {post.title}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {moment(post.updatedAt).fromNow()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{post.views || 0} views</span>
                </div>
              </div>
            ))}
          </div>
        </DataTable>
      </div>
    </div>
  );
};

export default DashboardComp;
