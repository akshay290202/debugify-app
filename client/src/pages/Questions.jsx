import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Questions = () => {
  const [posts,setrecentPosts] = useState(null);
  const [loading, setloading] = useState(true);
  const [showMore , setshowMore] = useState(true);
  useEffect(() => {
    try {
      setloading(true);
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=10`);
        const data = await res.json();
        // console.log(data);
        if(res.ok){
          setrecentPosts(data.posts);
          setloading(false);
          if(data.posts.length < 10){
            setshowMore(false);
          }
        }
      }
      fetchRecentPosts();
    } catch (error) {
      setloading(false);
      console.log(error.message);
    }
    
  },[]);

  const handleShowMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setrecentPosts((prev) => [...prev , ...data.posts]);
        if(data.posts.length < 10){
          setshowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading === true)
    return (
      <div className="flex justify-center  mx-auto items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className='min-h-screen max-w-3xl mx-auto flex flex-col justify-center items-center gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Questions</h1>
      <div className="flex flex-col mt-5 gap-3">
        {
          posts && 
          posts.map((onepost) => (
            <Link to={`/post/${onepost.slug}`} className="flex text-cyan-500 hover:text-cyan-600" key={onepost.id}>{onepost.title}</Link>
          ))
        }
        </div>
        {
            showMore && (
              <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-md font-semibold py-2">Show more</button>
            )
          }
    </div>
  )
}

export default Questions