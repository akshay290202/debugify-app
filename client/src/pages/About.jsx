import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiCode, HiUsers, HiLightBulb, HiStar, HiArrowRight, HiSparkles, HiHeart, HiTrendingUp, HiChat, HiShieldCheck, HiLightningBolt } from "react-icons/hi";
import { FaGithub, FaTwitter, FaLinkedin, FaRocket } from "react-icons/fa";

const About = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { number: "10,000+", label: "Developers", icon: HiUsers },
    { number: "50,000+", label: "Questions Solved", icon: HiChat },
    { number: "99.9%", label: "Uptime", icon: HiShieldCheck },
    { number: "24/7", label: "Community Support", icon: HiHeart }
  ];

  const features = [
    {
      icon: HiCode,
      title: "Smart Code Analysis",
      description: "AI-powered code analysis helps identify bugs faster than ever before.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: HiUsers,
      title: "Global Community",
      description: "Connect with developers from 180+ countries worldwide.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: HiLightBulb,
      title: "Instant Solutions",
      description: "Get real-time answers to your coding challenges within minutes.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: HiTrendingUp,
      title: "Skill Growth",
      description: "Track your progress and level up your coding skills continuously.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: HiLightningBolt,
      title: "Lightning Fast",
      description: "Optimized performance ensures smooth debugging experience.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: HiSparkles,
      title: "Innovation Hub",
      description: "Discover cutting-edge solutions and best practices.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "Debugify transformed how I approach problem-solving. The community is incredible!"
    },
    {
      name: "Marcus Rodriguez",
      role: "Full Stack Engineer",
      company: "StartupXYZ",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "From junior to senior developer, Debugify has been my constant companion."
    },
    {
      name: "Aisha Patel",
      role: "Tech Lead",
      company: "Innovation Labs",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "The quality of solutions here is unmatched. It's like having a team of experts."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-ping"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-blue-200 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 font-medium mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <HiSparkles className="w-5 h-5 mr-2 " />
              Trusted by 10,000+ developers worldwide
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
                Revolutionizing
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Code Debugging
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Welcome to <span className="font-bold text-blue-600 dark:text-blue-400">Debugify</span> - where coding challenges become collaborative victories. 
              Join a thriving ecosystem of passionate developers solving problems together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => navigate('/create-post')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center">
                  <FaRocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Start Your Journey
                  <HiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => navigate('/questions')}
                className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-semibold rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 hover:border-blue-400"
              >
                Explore Questions
              </button>
            </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${isVisible ? 'animate-fade-in' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Modern Developers</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience next-generation debugging tools designed for the future of software development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                  activeFeature === index ? 'ring-4 ring-blue-500/50 shadow-blue-500/25' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by Developers Worldwide
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how Debugify is transforming careers and building better software
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-blue-500 mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{testimonial.role}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="w-5 h-5" />
                  ))}
                </div>
              </div>
            ))}
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

export default About;
