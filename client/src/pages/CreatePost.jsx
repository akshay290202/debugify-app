import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { HiSparkles, HiPencil, HiCode, HiCollection, HiDocumentText, HiLightningBolt, HiCheckCircle } from "react-icons/hi";
import { useToast } from '../components/Toast';

const CreatePost = () => {
  const { currentUser } = useLocation();
  const navigate = useNavigate();
  const { showSuccess } = useToast();
  const [formData, setformData] = useState({});
  const [publishError, setpublishError] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/post/create`,{
        method: 'POST',
          headers: { 'Content-Type' : 'application/json'},
          body: JSON.stringify({
            "title" : formData.title,
            "category" : formData.category,
            "content" : formData.content,
          }),
          credentials: 'include',
          redirect : "follow",

      });
      const data = await res.json();
      if(!res.ok){
        setpublishError(data.message);
        setIsPublishing(false);
        return;
      }
      if(res.ok){
        setpublishError(null);
        setIsPublishing(false);
        showSuccess("Post created successfully! Redirecting to your post...", "Success");
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setpublishError('Something went wrong');
      setIsPublishing(false);
    }
  }

  const categories = [
    { value: "Uncategorized", label: "Select a Category", disabled: true },
    { value: "Javascript", label: "JavaScript" },
    { value: "React.js", label: "React.js" },
    { value: "Next.js", label: "Next.js" },
    { value: "Node.js", label: "Node.js" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "C#", label: "C#" },
    { value: "PHP", label: "PHP" },
    { value: "SQL", label: "SQL" },
  ];

  const handleCategoryChange = (e) => {
    setformData({...formData, category : e.target.value});
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-primary-900/10 dark:to-secondary-900/10">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 dark:from-primary-800 dark:via-primary-900 dark:to-secondary-800">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-secondary-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-medium mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <HiSparkles className="w-5 h-5 mr-2" />
              Share Your Knowledge
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Create
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-100 via-pink-100 to-white bg-clip-text text-transparent">
                New Post
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Share your coding questions, solutions, and insights with our vibrant developer community
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { icon: HiCode, text: "Code Snippets" },
                { icon: HiCollection, text: "Rich Formatting" },
                { icon: HiLightningBolt, text: "Instant Publishing" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white/90 text-sm">
                  <feature.icon className="w-4 h-4 mr-2" />
                  {feature.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Form Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
            
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-4">
                <HiPencil className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Post Details
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill in the information below to create your post
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Title and Category Row */}
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Title Field */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <HiDocumentText className="w-4 h-4 mr-2 text-primary-600" />
                    Post Title
                  </label>
                  <TextInput
                    type="text"
                    placeholder="Enter your post title..."
                    required
                    id="title"
                    onChange={(e) => setformData({...formData, title : e.target.value})}
                    className="w-full"
                    style={{
                      backgroundColor: 'transparent',
                      borderRadius: '12px',
                      border: '2px solid rgb(229 231 235 / 0.5)',
                    }}
                  />
                </div>

                {/* Category Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <HiCollection className="w-4 h-4 mr-2 text-primary-600" />
                    Category
                  </label>
                  <Select 
                    onChange={handleCategoryChange}
                    className="w-full"
                    style={{
                      borderRadius: '12px',
                      border: '2px solid rgb(229 231 235 / 0.5)',
                    }}
                  >
                    {categories.map((cat, index) => (
                      <option key={index} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Content Editor */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <HiCode className="w-4 h-4 mr-2 text-primary-600" />
                  Content
                </label>
                <div className="relative">
                  <ReactQuill
                    className="h-80 mb-12 rounded-2xl overflow-hidden shadow-lg"
                    theme="snow"
                    placeholder="Share your coding question, solution, or insights. Use code blocks for syntax highlighting..."
                    onChange={(value) => {
                      setformData({...formData , content : value});
                    }}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                        ['link', 'image', 'code-block'],
                        ['clean']
                      ],
                    }}
                    style={{
                      borderRadius: '16px',
                    }}
                  />
                </div>
              </div>

              {/* Publish Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isPublishing}
                  className="w-full group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isPublishing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <HiLightningBolt className="w-5 h-5" />
                        <span>Publish Post</span>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
              </div>

              {/* Error Message */}
              {publishError && (
                <div className="mt-6 p-4 bg-danger-50 dark:bg-danger-900/30 border border-danger-200 dark:border-danger-800 rounded-2xl">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-danger-500 rounded-full flex items-center justify-center mr-3">
                      <HiCode className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-danger-700 dark:text-danger-300 font-medium">
                      {publishError}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <HiLightningBolt className="w-5 h-5 mr-2 text-primary-600" />
              Writing Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start">
                <HiCheckCircle className="w-4 h-4 mr-2 text-success-500 mt-0.5 flex-shrink-0" />
                <span>Use descriptive titles that clearly explain your question or topic</span>
              </div>
              <div className="flex items-start">
                <HiCheckCircle className="w-4 h-4 mr-2 text-success-500 mt-0.5 flex-shrink-0" />
                <span>Include code snippets to provide context and examples</span>
              </div>
              <div className="flex items-start">
                <HiCheckCircle className="w-4 h-4 mr-2 text-success-500 mt-0.5 flex-shrink-0" />
                <span>Choose the most relevant category for better discoverability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
