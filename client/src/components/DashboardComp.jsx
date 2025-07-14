import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Table } from 'flowbite-react';
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        // console.log(data);
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
        // console.log(data);
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

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        
        <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 font-semibold flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>


        <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 font-semibold flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>



        <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Comments</h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 font-semibold flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>
      </div>

    <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md ">
            <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className="text-center py-2">Recent users</h1>
                <button
              type="button"
              className="text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900"
            >
              <Link to={'/dashboard?tab=users'}>See all</Link>
            </button>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>User Image</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                </Table.Head>
                {
                    users && users.map((user) => (
                        <Table.Body key={user.id} className="divide-y">
                            <Table.Row className="bg-white">
                                <Table.Cell>
                                    <img src={user.profilePicture} alt="user" className="w-10 h-10 rounded bg-gray-500"/>
                                </Table.Cell>
                                <Table.Cell>
                                    {user.username}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))
                }
            </Table>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md ">
            <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className="text-center py-2">Recent comments</h1>
                <button
              type="button"
              className="text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900"
            >
              <Link to={'/dashboard?tab=comments'}>See all</Link>
            </button>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>comment content</Table.HeadCell>
                    <Table.HeadCell>Likes</Table.HeadCell>
                </Table.Head>
                {
                    comments && comments.map((comment) => (
                        <Table.Body key={comment.id} className="divide-y">
                            <Table.Row className="bg-white">
                                <Table.Cell className="w-96">
                                    <p className="line-clamp-2">{comment.content}</p>
                                </Table.Cell>
                                <Table.Cell>
                                    {comment.numberOfLikes}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))
                }
            </Table>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md ">
            <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className="text-center py-2">Recent posts</h1>
                <button
              type="button"
              className="text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900"
            >
              <Link to={'/dashboard?tab=posts'}>See all</Link>
            </button>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Post Title</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Last Updated</Table.HeadCell>
                </Table.Head>
                {
                    posts && posts.map((post) => (
                        <Table.Body key={post.id} className="divide-y">
                            <Table.Row className="bg-white">
                                <Table.Cell className="w-96">
                                    {post.title}
                                </Table.Cell>
                                <Table.Cell className="w-5">
                                    {post.category}
                                </Table.Cell>
                                <Table.Cell>
                                    {moment(post.updatedAt).fromNow()}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))
                }
            </Table>
        </div>

        
    </div>

    </div>
  );
};

export default DashboardComp;
