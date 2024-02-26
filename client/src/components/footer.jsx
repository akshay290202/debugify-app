import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "/coding-html-svgrepo-com.svg";
import { FaHome  } from 'react-icons/fa';
import { IoBugSharp } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { FaGithub ,FaLinkedin  } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";

const footer = () => {
  return (
    <Footer container className="border border-t-8 border-orange-400">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              style={{ display: "flex" }}
              className="font-bold dark:text-white sm:text-4xl text:lg"
              to="/"
            >
              <img src={logo} className="mr-3 h-6 sm:h-9" alt="Debugify Logo" />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                Debugify
              </span>
            </Link>
            <p className="mt-5">Debugify the onestop solution to all your bugs.</p>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-5 sm:grid-cols-2 sm-gap-6 justify-start">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
              <div className="flex gap-1">
                <div className="my-auto">{<FaHome/>}</div>
                <Footer.Link href="/">Home</Footer.Link>
              </div>
              <div className="flex gap-1">
                <div className="my-auto">{<IoBugSharp/>}</div>
                <Footer.Link href="/questions">Questions</Footer.Link>
              </div>
              <div className="flex gap-1">
                <div className="my-auto">{<IoIosInformationCircle/>}</div>
                <Footer.Link href="/about">About Us</Footer.Link>
              </div>
                
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Social Media" />
              <Footer.LinkGroup col>
              <div className="flex gap-1">
                <div className="my-auto">{<RiInstagramFill/>}</div>
                <Footer.Link href="https://www.instagram.com/_._a.k__._/" target="_blank" rel="noopener noreferrer">Instagram</Footer.Link>
              </div>

              <div className="flex gap-1">
                <div className="my-auto">{<FaGithub/>}</div>
                <Footer.Link href="https://github.com/akshay290202" target="_blank" rel="noopener noreferrer">Github</Footer.Link>
              </div>
                
              <div className="flex gap-1">
                <div className="my-auto">{<FaLinkedin/>}</div>
                <Footer.Link href="https://www.linkedin.com/in/akshay2902/" target="_blank" rel="noopener noreferrer">LinkedIn</Footer.Link>
              </div>
                
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="w-full text-center ">
            <Footer.Copyright href="#" by = "by Akshay. All rights reserved!" year={new Date().getFullYear()}/>
        </div>

      </div>
    </Footer>
  );
};

export default footer;
