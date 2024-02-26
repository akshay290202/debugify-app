import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-5 py-10 text-center">
        <div className="">
          <h1 className="text-3xl font-semibold text-center my-7 ">About Debugify</h1>
          <div className="text-lg text-gray-500 flex flex-col gap-6">
            <p>
              "Welcome to <span className="text-black font-semibold">Debugify</span>, the premier online platform designed to
              revolutionize the way developers troubleshoot and learn from each
              other. With <span className="text-black font-semibold">Debugify</span>, coding conundrums become collaborative
              opportunities. Simply pose your questions, whether they concern
              debugging, algorithm optimization, language syntax, or best coding
              practices, and tap into the collective knowledge of our diverse
              community.
            </p>
            <p>
              Our platform fosters an environment of mutual support and growth,
              where seasoned developers and coding enthusiasts alike come
              together to share insights, offer solutions, and engage in
              constructive discussions. Whether you're a beginner seeking
              guidance or a seasoned pro looking to lend a helping hand,
              <span className="text-black font-semibold">Debugify</span> provides the ideal space to exchange ideas and expand
              your programming expertise.
            </p>
            <p>
              But <span className="text-black font-semibold">Debugify</span> is more than just a Q&A forum—it's a dynamic hub of
              learning resources. Dive into our extensive archives of resolved
              queries to uncover valuable insights and learn from real-world
              coding challenges. Explore tutorials, articles, and code snippets
              contributed by fellow members to broaden your understanding and
              stay ahead in the ever-evolving world of programming.
            </p>
            <p>
              Join <span className="text-black font-semibold">Debugify</span> today and embark on a journey of collaborative
              problem-solving, continuous learning, and community-driven
              innovation. Together, let's debug, optimize, and elevate our
              coding skills to new heights!"
            </p>

            
          </div>
          <button type="text" onClick={() => navigate('/create-post')} className="focus:outline-none mt-10 text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 border-0 dark:focus:ring-orange-900">
              Start Debugging
            </button>
        </div>
      </div>
    </div>
  );
};

export default About;
