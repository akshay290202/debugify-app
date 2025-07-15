import React, { useEffect, useState } from "react";
import { Select, TextInput } from "flowbite-react";
import { Link, useLocation , useNavigate} from "react-router-dom";
import { HiSearch, HiFilter, HiClock, HiTag, HiDocument, HiEye } from "react-icons/hi";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    
    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/post/getposts?${searchQuery}`, {
        credentials: 'include'
      });
      if (!res.ok) {
        setLoading(false);
        return;
      } else {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 12) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };

    fetchPosts();
  }, [location.search]);


  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex',startIndex);
    const searchQuery = urlParams.toString();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/post/getposts?${searchQuery}`, {
        credentials: 'include'
      });
    if(!res.ok){
      return;
    }
    else{
      const data = await res.json();
      setPosts([...posts,...data.posts]);
      if(data.posts.length === 12){
        setShowMore(true);
      }
      else{
        setShowMore(false);
      }
    }
    } catch (error) {
      console.log(error.message);
    }
    
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-xl p-6 space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded-lg w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
          </div>
          <div className="flex space-x-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
        <HiDocument className="w-12 h-12 text-blue-500 dark:text-blue-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Posts Found</h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
        We couldn't find any posts matching your search criteria. Try adjusting your filters or search terms.
      </p>
      <button
        onClick={() => {
          setSidebarData({ searchTerm: '', sort: 'desc', category: 'uncategorized' });
          navigate('/search');
        }}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
      >
        Clear Filters
      </button>
    </div>
  );

  const PostCard = ({ post }) => (
    <Link 
      to={`/post/${post.slug}`} 
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
          <div className="ml-4 flex-shrink-0">
            <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </div>
        </div>
        
        {post.content && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            {post.category && (
              <div className="flex items-center space-x-1">
                <HiTag className="w-4 h-4" />
                <span className="capitalize">{post.category}</span>
              </div>
            )}
            {post.createdAt && (
              <div className="flex items-center space-x-1">
                <HiClock className="w-4 h-4" />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
            <HiEye className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Read more</span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <div className="flex items-center mb-6">
                <HiFilter className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Search Filters</h2>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <HiSearch className="w-4 h-4 mr-2" />
                    Search Term
                  </label>
                  <TextInput  
                    placeholder='Enter keywords...'
                    id='searchTerm'
                    type='text'
                    value={sidebarData.searchTerm}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <HiClock className="w-4 h-4 mr-2" />
                    Sort Order
                  </label>
                  <Select 
                    onChange={handleChange} 
                    value={sidebarData.sort} 
                    id='sort'
                    className="w-full"
                  >
                    <option value='desc'>Latest First</option>
                    <option value='asc'>Oldest First</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <HiTag className="w-4 h-4 mr-2" />
                    Category
                  </label>
                  <Select
                    onChange={handleChange}
                    value={sidebarData.category}
                    id='category'
                    className="w-full"
                  >
                    <option value='Uncategorized'>All Categories</option>
                    <option value='React.js'>React.js</option>
                    <option value='Next.js'>Next.js</option>
                    <option value='Javascript'>JavaScript</option>
                    <option value='Node.js'>Node.js</option>
                    <option value='Python'>Python</option>
                    <option value='Java'>Java</option>
                    <option value='C++'>C++</option>
                    <option value='C#'>C#</option>
                    <option value='PHP'>PHP</option>
                    <option value='SQL'>SQL</option>
                  </Select>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg px-4 py-3 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  Apply Filters
                </button>
              </form>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Search Results
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {loading ? 'Searching...' : `Found ${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
              </p>
            </div>

            {loading && <LoadingSkeleton />}
            
            {!loading && posts.length === 0 && <EmptyState />}

            {!loading && posts.length > 0 && (
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
                
                {showMore && (
                  <div className="flex justify-center pt-8">
                    <button 
                      onClick={handleShowMore} 
                      className="group px-8 py-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20 dark:hover:from-blue-900/30 dark:hover:to-blue-800/30 text-blue-700 dark:text-blue-400 font-medium rounded-lg border border-blue-200 dark:border-blue-700 transition-all duration-200 transform hover:scale-105"
                    >
                      <span className="flex items-center">
                        Load More Posts
                        <div className="ml-2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full group-hover:animate-pulse"></div>
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
