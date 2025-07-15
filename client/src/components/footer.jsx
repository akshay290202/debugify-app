import React from "react";
import { Link } from "react-router-dom";
import logo from "/coding-icon-blue.svg";
import { FaHome, FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoBugSharp } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { IoIosInformationCircle } from "react-icons/io";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Single Row Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src={logo} 
                className="h-8 w-8 transition-transform duration-200 group-hover:scale-110" 
                alt="Debugify Logo" 
              />
              <span className="text-2xl font-bold text-gradient">
                Debugify
              </span>
            </Link>
            <span className="hidden md:block text-gray-300 dark:text-gray-600">|</span>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Debug smarter, code better
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
            >
              <FaHome className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/questions"
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
            >
              <IoBugSharp className="w-4 h-4" />
              <span>Questions</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
            >
              <IoIosInformationCircle className="w-4 h-4" />
              <span>About</span>
            </Link>
          </nav>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/akshay290202"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/akshay2902/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/_._a.k__._/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <RiInstagramFill className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            © {currentYear} <span className="text-primary-600 dark:text-primary-400 font-medium">Debugify</span> by Akshay
          </p>
          <div className="flex items-center space-x-4">
            <Link 
              to="/about" 
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Privacy
            </Link>
            <Link 
              to="/about" 
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Terms
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-xs">Made with ❤️ for developers</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
