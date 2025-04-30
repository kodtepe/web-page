import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import AddBlogsOnce from "./pages/AddBlogsOnce";
import BlogPage from "./pages/BlogPage";
import AdminPanel from "./pages/AdminPanel"; // AdminPanel eklendi
import PrivateRoute from "./components/PrivateRoute"; // PrivateRoute eklendi

function App() {
  return (
    <div style={{ backgroundColor: "#FFFFFFFF", minHeight: "100vh", color: "white" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/add-blogs" element={<AddBlogsOnce />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
