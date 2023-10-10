import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import CreatePost from "./Components/CreatePost";
import BlogPage from "./Components/BlogPage";
import EditBlog from "./Components/EditBlog";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/create-blog" element={<CreatePost />} />
                <Route path="/post/:id" element={<BlogPage />} />
                <Route path="/edit/:id" element={<EditBlog />} />
                
            </Routes>
        </Router>
    );
}

export default App;
