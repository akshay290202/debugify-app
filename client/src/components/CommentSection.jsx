import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import  Comment  from './Comment';
import { useNavigate } from "react-router-dom"; 
import { HiOutlineExclamationCircle} from 'react-icons/hi';
import { Alert, Button, Modal, TextInput, Textarea } from "flowbite-react";

const CommentSection = ({ postId }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setcomment] = useState("");
  const [comments, setcomments] = useState([]);
  const[showModal, setshowModal] = useState(false);
  const [commentToDelete , setcommentToDelete] = useState(null);
  const [commenterror, setcommenterror] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 300) return;

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId: postId,
          userId: currentUser.id,
        }),
        redirect: "follow",
      });
      const data = await res.json();
      if (res.ok) {
        setcomment("");
        setcommenterror(null);
        setcomments([data, ...comments]);
      }
    } catch (error) {
      setcommenterror(error.messsage);
    }
  };

  // console.log(postId);
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getpostcomments/${postId}`);
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

      const res = await fetch(`/api/comment/likecomment/${commentId}`,{
        method : 'PUT',
      }); 

      if(res.ok){
        const data = await res.json();
        // console.log(likes);
        setcomments(comments.map((comment) => 
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
    setcomments(
      comments.map((c) =>
      c.id === comment.id ? {...c , content : editedContent} : c
    ))
  };

  const handleDelete = async () => {
    setshowModal(false);
    try {
      if(!currentUser){
        navigate('/sign-in');
        return;
      }

      const res = await fetch(`/api/comment/deletecomment/${commentToDelete}`,{
        method : 'DELETE',
      });
      if(res.ok){
        
        const data = await res.json();
        setcomments(
          comments.filter((comment) => comment.id !== commentToDelete)
        )
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="user"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-gray-500 my-5 flex gap-1">
          You must be signed in to answer.
          <Link to={"/sign-in"} className="text-teal-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-orange-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add an answer..."
            rows="3"
            maxLength="300"
            onChange={(e) => setcomment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {300 - comment.length} characters remaining
            </p>
            <button
              type="submit"
              className="text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900"
            >
              Submit
            </button>
          </div>
          {commenterror && (
            <Alert color={"failure"} className="mt-5">
              {commenterror}
            </Alert>
          )}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm my-5">No Answers yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-2">
            <p>Answers</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {
            comments.map(comment => (
              <Comment key={comment.id} comment={comment} onLike = {handleLike} onEdit={handleEdit} onDelete={(commentId)=>{
                setshowModal(true);
                setcommentToDelete(commentId);
              }} />
            ))

          }
        </>
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
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-evenly ">
              <Button color="failure" onClick={handleDelete}>
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

export default CommentSection;
