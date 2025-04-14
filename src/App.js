import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import AddBlogsOnce from "./pages/AddBlogsOnce";



function App() {
  return (
    <div style={{ backgroundColor: "#FFFFFFFF", height: "100vh", color: "white" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/add-blogs" element={<AddBlogsOnce />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />


      </Routes>
    </div>
  );
}

export default App;
