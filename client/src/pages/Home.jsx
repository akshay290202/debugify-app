import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiCode, HiUsers, HiLightBulb, HiStar, HiSparkles, HiShieldCheck } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const [recentPosts, setRecentPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/post/getposts?limit=8`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecentPosts();
  }, []);

  const features = [
    {
      icon: HiCode,
      title: "Expert Solutions",
      description: "Get help from experienced developers across all programming languages"
    },
    {
      icon: HiUsers,
      title: "Vibrant Community",
      description: "Join thousands of passionate developers sharing knowledge daily"
    },
    {
      icon: HiLightBulb,
      title: "Learn & Grow",
      description: "Expand your skills through collaborative problem-solving"
    }
  ];

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      ))}
    </div>
  );

  const checkIfUserIsLoggedIn = () => {
    const user = useSelector(state => state.user.currentUser);
    if(user)
      return true;
    else
      return false;
  }


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center min-h-[80vh] py-12 lg:py-20">
            
            {/* Hero Content */}
            <div className="flex-1 lg:pr-12 text-center lg:text-left">
              <div className="animate-fade-in">
                <div className="inline-flex items-center px-4 py-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
                  <HiStar className="w-4 h-4 mr-2" />
                  Trusted by 10,000+ developers
                </div>
                
                <h1 className="hero-title mb-6 animate-slide-in text-shadow">
                  Welcome to <span className="text-gradient">Debugify</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl animate-slide-in" style={{animationDelay: '0.1s'}}>
                  Your premier destination for collaborative coding solutions. Connect with passionate developers and tackle any challenge together.
                </p>
                
                <div className="space-y-4 mb-8 animate-slide-in" style={{animationDelay: '0.2s'}}>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    At <span className="font-semibold text-primary-600 dark:text-primary-400">Debugify</span>, asking questions is simple. Post your query, add relevant tags, and watch as our community provides expert guidance.
                  </p>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Dive into discussions, explore tutorials, and contribute your knowledge to help others grow. With our diverse range of topics and programming languages, there's something here for everyone.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-in" style={{animationDelay: '0.3s'}}>
                  <Link to="/questions" className="btn-primary group">
                    Explore Questions
                  </Link>
                  {!checkIfUserIsLoggedIn() && (
                    <Link to="/sign-up" className="btn-outline">
                      Join Community
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="flex-1 mt-12 lg:mt-0 animate-bounce-gentle">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-3xl"></div>
                <img 
                  src="./modern-debugging-hero.svg" 
                  alt="Modern debugging and coding illustration"
                  className="relative w-full max-w-lg mx-auto rounded-3xl shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose Debugify?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join a thriving community dedicated to empowering each other to excel in the world of coding
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card-hover p-8 text-center group animate-scale-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl mb-6 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Questions Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="section-title">Recent Questions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover the latest discussions from our community
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="card p-8">
                <LoadingSkeleton />
              </div>
            ) : (
              <div className="card p-8">
                <div className="space-y-4">
                  {recentPosts && recentPosts.length > 0 ? (
                    recentPosts.map((onepost, index) => (
                      <Link
                        key={onepost.id}
                        to={`/post/${onepost.slug}`}
                        className="block p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-all duration-200 group animate-fade-in"
                        style={{animationDelay: `${index * 0.05}s`}}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {onepost.title}
                          </h3>
                          <HiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No questions found. Be the first to ask!</p>
                      <Link to="/create-post" className="btn-primary mt-4 inline-flex">
                        Ask a Question
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="text-center mt-8">
              <Link
                to="/questions"
                className="btn-secondary group flex items-center justify-center"
              >
                View All Questions
                <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"></div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Transform Your
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Coding Journey?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Join thousands of developers who've already revolutionized their debugging process. 
              Your next breakthrough is just a question away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {!checkIfUserIsLoggedIn() && (
                <button
                onClick={() => navigate('/sign-up')}
                className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center">
                    <HiSparkles className="w-6 h-6 mr-2 group-hover:animate-spin" />
                    Join Free Today
                    <HiArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              )}
              <button
                onClick={() => navigate('/questions')}
                className="px-10 py-5 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                Browse Questions
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center justify-center space-x-8">
              <div className="flex items-center text-gray-300">
                <HiUsers className="w-5 h-5 mr-2" />
                <span className="text-sm">10,000+ Active Users</span>
              </div>
              <div className="flex items-center text-gray-300">
                <HiStar className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center text-gray-300">
                <HiShieldCheck className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-sm">100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
