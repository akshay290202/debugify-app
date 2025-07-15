import { Alert, Button, FileInput, Select, TextInput, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { HiPencil, HiSave, HiExclamationCircle, HiDocument, HiTag, HiArrowLeft } from 'react-icons/hi';

const UpdatePost = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const [publishError, setpublishError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  // Available categories - could be fetched from API
  const categories = [
    { value: "uncategorized", label: "Select a Category" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Python", label: "Python" },
    { value: "Node.js", label: "Node.js" },
    { value: "CSS", label: "CSS" },
    { value: "HTML", label: "HTML" },
    { value: "Database", label: "Database" },
    { value: "AI/ML", label: "AI/ML" },
    { value: "DevOps", label: "DevOps" },
    { value: "Mobile", label: "Mobile" }
  ];

  useEffect(() => {
    try {
      const fetchPost = async () => {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/post/getposts?postId=${postId}`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setpublishError(data.message);
          setLoading(false);
          return;
        }
        else {
          setpublishError(null);
          setformData(data.posts[0]);
          setLoading(false);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
      setpublishError(error.message);
      setLoading(false);
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/post/updatepost/${formData.id}/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          content: formData.content,
        }),
        credentials: 'include',
        redirect: "follow",
      });
      const data = await res.json();
      if (!res.ok) {
        setpublishError(data.message);
        setUpdating(false);
        return;
      }
      if (res.ok) {
        setpublishError(null);
        setUpdating(false);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setpublishError("Something went wrong");
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-400/30 to-primary-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Spinner size="xl" className="text-primary-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-400/30 to-primary-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-gray-700 dark:text-white font-medium mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <HiPencil className="w-5 h-5 mr-2" />
              Content Editor
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Update Post
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              Refine and enhance your content
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-2xl hover:shadow-primary-500/10 transition-all duration-300">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Title and Category Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <HiDocument className="w-4 h-4 inline mr-2" />
                    Post Title
                  </label>
                  <TextInput
                    type="text"
                    placeholder="Enter your post title..."
                    required
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) =>
                      setformData({ ...formData, title: e.target.value })
                    }
                    className="w-full [&>div>input]:bg-white/50 [&>div>input]:dark:bg-gray-900/50 [&>div>input]:backdrop-blur-lg [&>div>input]:border-gray-200/50 [&>div>input]:dark:border-gray-700/50 [&>div>input]:rounded-lg [&>div>input]:text-gray-900 [&>div>input]:dark:text-white [&>div>input]:placeholder-gray-500 [&>div>input]:dark:placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <HiTag className="w-4 h-4 inline mr-2" />
                    Category
                  </label>
                  <Select
                    value={formData.category || 'uncategorized'}
                    onChange={(e) =>
                      setformData({ ...formData, category: e.target.value })
                    }
                    className="w-full [&>div>select]:bg-white/50 [&>div>select]:dark:bg-gray-900/50 [&>div>select]:backdrop-blur-lg [&>div>select]:border-gray-200/50 [&>div>select]:dark:border-gray-700/50 [&>div>select]:rounded-lg [&>div>select]:text-gray-900 [&>div>select]:dark:text-white"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Content
                </label>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <ReactQuill
                    className="h-96 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg"
                    value={formData.content || ''}
                    theme="snow"
                    placeholder="Share your knowledge and insights..."
                    onChange={(value) => {
                      setformData({ ...formData, content: value });
                    }}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['blockquote', 'code-block'],
                        ['link'],
                        ['clean']
                      ],
                    }}
                  />
                </div>
              </div>

              {/* Error Message */}
              {publishError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl p-4">
                  <div className="flex items-center">
                    <HiExclamationCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                        Update Failed
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                        {publishError}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {updating ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <HiSave className="w-5 h-5 mr-2" />
                      Update Post
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate(`/post/${formData.slug}`)}
                  className="px-6 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
                >
                  Preview
                </button>
              </div>
            </form>
          </div>

          {/* Post Info Card */}
          {formData.createdAt && (
            <div className="mt-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Post Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Created:</span>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {new Date(formData.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {new Date(formData.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Status:</span>
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    Published
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
