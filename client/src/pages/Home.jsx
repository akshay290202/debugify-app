import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [recentPosts, setrecentPosts] = useState(null);
  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=8`);
        const data = await res.json();
        if (res.ok) {
          setrecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col gap-6 py-28 px-14 mx-auto lg:pr-0">
          <h1 className="text-3xl font-bold lg:text-6xl">
            Welcome to Debugify
          </h1>
          <p className="text-gray-500 text-sm">
            {" "}
            Your premier destination for all things coding! Here, you'll find a
            thriving community of passionate developers eager to help you tackle
            any coding challenge you encounter. Whether you're a seasoned
            programmer or just starting your journey, our platform offers a
            welcoming space where you can ask questions, share insights, and
            collaborate with fellow enthusiasts.
          </p>

          <p className=" text-gray-500 text-sm">
            At <span className=" text-black font-semibold">Debugify</span>,
            asking questions is simple. Post your query, add relevant tags, and
            watch as our community members provide their expertise and guidance.
            But it doesn't stop there. Dive into discussions, explore tutorials,
            and contribute your own knowledge to help others grow. With our
            diverse range of topics and programming languages, there's something
            here for everyone.
          </p>

          <p className="text-gray-500 text-sm">
            Join us today and become part of a supportive community dedicated to
            empowering each other to excel in the world of coding. Let's learn,
            grow, and code together on{" "}
            <span className=" text-black font-semibold">Debugify!</span>
          </p>
        </div>
        <div className="my-auto">
          <img src="./How-to-Get-Better-At-App-Debugging.webp" alt="img" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mb-5 px-3">
        <h1 className="text-xl mt-5 font-semibold">Recent Questions</h1>
        <div className="flex flex-col mt-5 gap-2">
          {recentPosts &&
            recentPosts.map((onepost) => (
              <Link
                to={`/post/${onepost.slug}`}
                className="flex text-cyan-500 hover:text-cyan-600"
                key={onepost.id}
              >
                {onepost.title}
              </Link>
            ))}
        </div>
        <Link
          to="/questions"
          className="text-xs mt-6 sm:text-sm text-teal-400 font-semibold mx-auto hover:text-teal-500 "
        >
          View all Questions
        </Link>
      </div>
    </div>
  );
};

export default Home;
