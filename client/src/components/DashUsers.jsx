import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Spinner, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import {HiOutlineExclamationCircle } from 'react-icons/hi';
import {FaCheck , FaTimes } from 'react-icons/fa';

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [showMore , setshowMore] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [userIdToDelete , setuserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setloading(false);
          setusers(data.users);
          if(data.users.length < 9){
            setshowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
        setloading(false);
      }
    };
    fetchUsers();
  }, [currentUser.id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setusers((prev) => [...prev , ...data.users]);
        if(data.users.length < 9){
          setshowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`,{
        method : 'DELETE',
      });
      const data = await res.text();
      if(res.ok){
        setusers((prev) => prev.filter((user) => user.id !== userIdToDelete) );
        setshowModal(false);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
      }
      else{
        console.log(data.message);
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
      { currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y" key={user.id}>
                <Table.Row className="bg-white">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img src={user.profilePicture} alt={user.username}  className="w-10 h-10 object-cover bg-gray-500 rounded" />
                  </Table.Cell>
                  <Table.Cell>
                    {user.username}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin ? (<FaCheck className="text-green-500"/>) : (<FaTimes className="text-red-500"/>)}</Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setshowModal(true);
                      setuserIdToDelete(user.id);
                    }} className="text-red-500 font-medium hover:underline cursor-pointer">Delete</span>
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
        <p>No Users Yet!</p>
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-evenly ">
              <Button color="failure" onClick={handleDeleteUser}>
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

export default DashUsers;
