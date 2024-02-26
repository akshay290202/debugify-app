import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button, Spinner } from "flowbite-react";
import CommentSection from "../components/CommentSection";
import moment from 'moment';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const[recentPosts, setrecentPosts] = useState(null);
  const [postuser , setPostUser] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setloading(false);
        } else {
          setPost(data.posts[0]);
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
        // console.log(post.userId);
        const res = await fetch(`/api/user/getuser/${post.userId}`);
        const data = await res.json();
        if(res.ok){
          setPostUser(data);
        }
        else{
          console.log(error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
  
    };
    if(post != null)
    fetchUser();
  },[post]);
  
  // console.log(recentPosts);
  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=4`);
        const data = await res.json();
        if(res.ok){
          setrecentPosts(data.posts);
        }
      }
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
    
  },[]);
  

  if (loading === true)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 font-serif max-w-1xl  mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <div className="flex text-gray-700 text-xs mt-1 justify-between mx-auto w-full max-w-2xl gap-2">
        <span className="flex gap-1 truncate">Asked by <img className='h-4 w-4 rounded-full object-cover' src={postuser.profilePicture}/> <span className="text-cyan-500 gap-1">{postuser.username}</span></span>
        <span className="">
          Asked <span className="text-black font-semibold text-sm font-sans">{post && moment(post.createdAt).fromNow()}</span>
        </span>
        <span className="">
          Last modified <span className="text-black font-semibold text-sm font-sans">{post && moment(post.updatedAt).fromNow()}</span>
        </span>
      </div>
      <div className="border border-gray-300"></div>

      <div className="ql-snow">
      <div className="p-3 w-full ql-editor post-content" dangerouslySetInnerHTML={ {__html: post && post.content } }></div>

      </div>
          <Link to={`/search?category=${post && post.category}`} >
            <Button color="gray" pill size='xs' className="text-cyan-500 mx-auto mt-2">{"#"}{post && post.category}</Button>
          </Link>
      
      

      <CommentSection postId={post._id} />
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent Questions</h1>
        <div className="flex flex-col mt-5 gap-2">
        {
          recentPosts && 
          recentPosts.map((onepost) => (
            <Link to={`/post/${onepost.slug}`} className="flex text-cyan-500 hover:text-cyan-600" key={onepost._id}>{onepost.title}</Link>
          ))
        }
        </div>
      </div>
    </main>
  );
};

export default PostPage;
