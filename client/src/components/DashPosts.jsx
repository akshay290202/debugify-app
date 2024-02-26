import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Spinner, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import {HiOutlineExclamationCircle , } from 'react-icons/hi';

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setuserPosts] = useState([]);
  const [loading, setloading] = useState(true);
  const [showMore , setshowMore] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [PostIdToDelete , setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setuserPosts(data.posts);
          setloading(false);
          if(data.posts.length < 12){
            setshowMore(false);
          }
        }
      } catch (error) {
        setloading(false);
        console.log(error);
      }
    };
    fetchPosts();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setuserPosts((prev) => [...prev , ...data.posts]);
        if(data.posts.length < 12){
          setshowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setshowModal(false);
    try {
      const res = await fetch(`/api/post/deletepost/${PostIdToDelete}/${currentUser._id}` , {
        method : 'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }
      else{
        setuserPosts((prev) => 
          prev.filter((post) => post._id !== PostIdToDelete)
        )
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
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 ">
      {userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row className="bg-white">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="font-medium text-gray-900" to={`/post/${post.slug}`}>{post.title}</Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setshowModal(true);
                      setPostIdToDelete(post._id);
                    }} className="text-red-500 font-medium hover:underline cursor-pointer">Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">Show more</button>
            )
          }
        </>
      ) : (
        <p>No Posts Yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setshowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-evenly ">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I'm Sure
              </Button>
              <Button color="gray" onClick={() => setshowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashPosts;
