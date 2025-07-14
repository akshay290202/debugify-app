import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiUser, HiCog, HiLogout, HiViewGrid, HiMenu, HiX } from "react-icons/hi";
import logo from "/coding-html-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice.js";
import { useTheme } from "./ThemeProvider";

const Header = () => {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { darkMode, toggleDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout/', {
        method: "POST",
      });
      
      let data = await res.text();
      
      if (res.ok) { 
        console.log("Sign out successful:", data);
        dispatch(signOutSuccess());
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
      } else {
        console.log("Sign out failed:", data);
      }
    } catch (error) {
      console.log("Sign out error:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const isActive = (currentPath) => path === currentPath;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src={logo} 
                className="h-8 w-8 transition-transform duration-200 group-hover:scale-110" 
                alt="Debugify Logo" 
              />
              <div className="absolute inset-0 bg-primary-500/20 rounded-full blur group-hover:bg-primary-500/40 transition-all duration-200"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Debugify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'About' },
              { path: '/questions', label: 'Questions' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Desktop Search */}
            <form onSubmit={handleSubmit} className="hidden lg:block">
              <div className={`relative transition-all duration-200 ${isSearchFocused ? 'scale-105' : ''}`}>
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-64 pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400 dark:placeholder-gray-500"
                />
                <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </form>

            {/* Mobile Search Button */}
            <button
              onClick={() => navigate('/search')}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              <AiOutlineSearch className="w-5 h-5" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <FaSun className="w-4 h-4" />
              ) : (
                <FaMoon className="w-4 h-4" />
              )}
            </button>

            {/* User Menu or Sign In */}
            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="relative group">
                    <Avatar 
                      alt="user" 
                      img={currentUser.profilePicture} 
                      rounded 
                      className="ring-2 ring-transparent group-hover:ring-primary-200 dark:group-hover:ring-primary-800 transition-all duration-200"
                    />
                    <div className="absolute inset-0 rounded-full bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </div>
                }
              >
                <Dropdown.Header>
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      @{currentUser.username}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </Dropdown.Header>

                <Link to="/dashboard?tab=dash">
                  <Dropdown.Item className="flex items-center space-x-2 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                    <HiViewGrid className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Dropdown.Item>
                </Link>

                <Link to="/dashboard?tab=profile">
                  <Dropdown.Item className="flex items-center space-x-2 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                    <HiUser className="w-4 h-4" />
                    <span>Profile</span>
                  </Dropdown.Item>
                </Link>

                <Dropdown.Divider />

                <Dropdown.Item 
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <HiLogout className="w-4 h-4" />
                  <span>Sign out</span>
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to="/sign-in">
                <button className="btn-primary text-sm px-4 py-2">
                  Sign In
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-5 h-5" />
              ) : (
                <HiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="px-4 py-2 space-y-1">
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'About' },
              { path: '/questions', label: 'Questions' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Search */}
            <div className="pt-4 pb-2">
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
