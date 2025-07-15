import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Questions from "./pages/Questions";
import SignUp from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
import { ThemeProvider } from "./components/ThemeProvider";
import { ToastProvider } from "./components/Toast";

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Header />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/create-post" element={<CreatePost />} />
                </Route>
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/search" element={<Search />} />
                <Route path="/questions" element={<Questions />} />
                
                <Route path="/update-post/:postId" element={<UpdatePost />} />
                <Route path="/post/:postSlug" element={<PostPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
