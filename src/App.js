import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import AddBlogsOnce from "./pages/AddBlogsOnce";
import BlogPage from "./pages/BlogPage";
import AdminPanel from "./pages/AdminPanel";
import PrivateRoute from "./components/PrivateRoute";
import MemberPanel from "./pages/MemberPanel";
import AdminMigration from "./pages/AdminMigration";
import Footer from "./components/Footer";


function App() {

    const location = useLocation();

  // Bu path'lerde Navbar ve Footer gizlensin
  const hiddenPaths = ["/admin"];

  const hideLayout = hiddenPaths.some((path) =>
    location.pathname.startsWith(path)
  );


  return (
    <div style={{ backgroundColor: "#FFFFFFFF", minHeight: "100vh", color: "white" }}>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/add-blogs" element={<AddBlogsOnce />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/member" element={<MemberPanel />} />
        <Route path="/admin-data-updater" element={<AdminMigration />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
