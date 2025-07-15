import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Textarea } from "flowbite-react";

function Comment({ comment, onLike ,onEdit ,onDelete }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [editedContent, seteditedContent] = useState(comment.content);
  const [isEditing, setisEditing] = useState(false);
  // console.log(comment);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/user/getuser/${comment.userId}`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setisEditing(true);
    seteditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
              const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/comment/editcomment/${comment.id}`,{
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          content : editedContent,
        }),
        credentials: 'include',
        redirect : 'follow',
      })

      if(res.ok){
        setisEditing(false);
        onEdit(comment,editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkIfUserHasLiked = (likes = [],userId) => {
    return likes?.some(like => like.user.id === userId);
  }

  return (
    <div className="flex p-4 border-b text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="h-10 w-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt="user"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "Anonymous"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => seteditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                type="button"
                className=" focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-xs px-4 py-2 dark:focus:ring-orange-900"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-xs px-4 py-2 text-center dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900"
                onClick={() => setisEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t  max-w-fit gap-3">
              <button
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  checkIfUserHasLiked(comment.likes,currentUser.id)&&
                  "!text-blue-500"
                }`}
                type="button"
                onClick={() => onLike(comment.id)}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser.id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                    type="button"
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(comment.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
