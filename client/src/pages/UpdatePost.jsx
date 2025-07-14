import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux'

const UpdatePost = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const [publishError, setpublishError] = useState(null);
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if(!res.ok){
            console.log(data.message);
            setpublishError(data.nessage);
            return;
        }
        else{
            setpublishError(null);
            setformData(data.posts[0]);
        }

    };
        fetchPost();

    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData.id}/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          content: formData.content,
        }),
        redirect: "follow",
      });
      const data = await res.json();
      if (!res.ok) {
        setpublishError(data.message);
        return;
      }
      if (res.ok) {
        setpublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setpublishError("Something went wrong");
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setformData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setformData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">JavaScript</option>
            <option value="react.js">React.js</option>
            <option value="next.js">Next.js</option>
          </Select>
        </div>
        <ReactQuill
          className="h-72 mb-12"
          value={formData.content}
          theme="snow"
          placeholder="Write something........."
          required
          onChange={(value) => {
            setformData({ ...formData, content: value });
          }}
        />
        <button
          type="submit"
          className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-orange-900"
        >
          Update
        </button>

        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default UpdatePost;
