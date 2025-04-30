// src/pages/AdminPanel.jsx
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import Footer from "../components/Footer";
import ContactMessages from "../components/ContactMessages";
import Applications from "../components/Applications";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("blogEkle");
  const [blogs, setBlogs] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [blogInput, setBlogInput] = useState({ title: "", author: "", summary: "", content: "", tags: "" });
  const [jobInput, setJobInput] = useState({ position: "", short: "", detail: "" });

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  const fetchBlogs = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    setBlogs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const fetchJobs = async () => {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    setJobs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const addBlog = async (e) => {
    e.preventDefault();
    const tagsArray = blogInput.tags.split(",").map((tag) => tag.trim());
    await addDoc(collection(db, "blogs"), { ...blogInput, tags: tagsArray });
    setBlogInput({ title: "", summary: "", content: "", tags: "" });
    fetchBlogs();
    setActiveTab("blogListele");
  };

  const deleteBlog = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
    fetchBlogs();
  };

  const addJob = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "jobs"), jobInput);
    setJobInput({ position: "", short: "", detail: "" });
    fetchJobs();
    setActiveTab("ilanListele");
  };

  const deleteJob = async (id) => {
    await deleteDoc(doc(db, "jobs", id));
    fetchJobs();
  };

  const renderTags = (tags) => {
    if (!tags) return null;
    const tagArray = Array.isArray(tags) ? tags : String(tags).split(",");
    return tagArray.map((tag, index) => (
      <span key={index} className="bg-gray-200 text-sm text-black px-3 py-1 rounded-full mr-2 mb-2 inline-block">
        {tag.trim()}
      </span>
    ));
  };

  const handleEditBlog = (blog) => {
    setBlogInput({
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags,
    });
    setActiveTab("blogEkle");
  };

  useEffect(() => {
    fetchBlogs();
    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-black text-white flex flex-col p-6 space-y-6 text-lg">
          <h2 className="text-2xl font-bold text-[#FAD76F]">Kodtepe Admin</h2>
          <nav className="flex flex-col gap-4 text-left">
            <button
              onClick={() => setActiveTab("blogEkle")}
              className={`${activeTab === "blogEkle" ? "text-[#FAD76F]" : "text-white"}`}
            >
              Blog ekle
            </button>
            <button
              onClick={() => setActiveTab("blogListele")}
              className={`${activeTab === "blogListele" ? "text-[#FAD76F]" : "text-white"}`}
            >
              Blogları Listele
            </button>
            <button
              onClick={() => setActiveTab("ilanEkle")}
              className={`${activeTab === "ilanEkle" ? "text-[#FAD76F]" : "text-white"}`}
            >
              İlan Ekle
            </button>
            <button
              onClick={() => setActiveTab("ilanListele")}
              className={`${activeTab === "ilanListele" ? "text-[#FAD76F]" : "text-white"}`}
            >
              İlanları Listele
            </button>
            <button
              onClick={() => setActiveTab("mesajlar")}
              className={`${activeTab === "mesajlar" ? "text-[#FAD76F]" : "text-white"}`}
            >
              Mesajlar
            </button>
            <button
              onClick={() => setActiveTab("basvurular")}
              className={`${activeTab === "basvurular" ? "text-[#FAD76F]" : "text-white"}`}
            >
              Başvurular
            </button>
          </nav>
          <button
            onClick={handleLogout}
            className="mt-10 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md transition"
          >
            Çıkış Yap
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 bg-white p-6 overflow-auto">
          {activeTab === "blogEkle" && (
            <form onSubmit={addBlog} className="bg-[#FAD76F] p-6 rounded-lg w-full max-w-2xl mx-auto">
              <h2 className="text-xl font-bold mb-4 text-center text-black">Yeni Blog Ekle</h2>

              <input
                type="text"
                placeholder="Başlık"
                value={blogInput.title}
                onChange={(e) => setBlogInput({ ...blogInput, title: e.target.value })}
                className="w-full mb-4 p-2 rounded border text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="text"
                placeholder="Yazar"
                value={blogInput.author}
                onChange={(e) => setBlogInput({ ...blogInput, author: e.target.value })}
                className="w-full mb-4 p-2 rounded border text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="text"
                placeholder="Etiketler (virgülle ayırın)"
                value={blogInput.tags}
                onChange={(e) => setBlogInput({ ...blogInput, tags: e.target.value })}
                className="w-full mb-4 p-2 rounded border text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <textarea
                placeholder="Özet"
                rows={3}
                value={blogInput.summary}
                onChange={(e) => setBlogInput({ ...blogInput, summary: e.target.value })}
                className="w-full mb-4 p-2 rounded border text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <textarea
                placeholder="İçerik"
                rows={6}
                value={blogInput.content}
                onChange={(e) => setBlogInput({ ...blogInput, content: e.target.value })}
                className="w-full mb-4 p-2 rounded border text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Kaydet
              </button>
            </form>
          )}

          {activeTab === "blogListele" && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-center text-black">Blogları Listele</h2>
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-[#FAD76F] p-4 rounded flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div>
                    <h3 className="font-bold text-black text-lg">{blog.title}</h3>
                    <p className="text-sm text-black">{blog.summary}</p>
                    <div className="mt-2">{renderTags(blog.tags)}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditBlog(blog)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "ilanEkle" && (
            <form onSubmit={addJob} className="bg-[#FAD76F] p-6 rounded-lg w-full max-w-2xl mx-auto">
              <h2 className="text-xl font-bold mb-4 text-center text-black">Yeni İlan Ekle</h2>
              <input
                type="text"
                placeholder="Pozisyon"
                value={jobInput.position}
                onChange={(e) => setJobInput({ ...jobInput, position: e.target.value })}
                className="w-full mb-4 p-2 rounded border text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <textarea
                placeholder="Kısa Açıklama"
                rows={3}
                value={jobInput.short}
                onChange={(e) => setJobInput({ ...jobInput, short: e.target.value })}
                className="w-full mb-4 p-2 rounded border text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <textarea
                placeholder="Detaylı Açıklama"
                rows={6}
                value={jobInput.detail}
                onChange={(e) => setJobInput({ ...jobInput, detail: e.target.value })}
                className="w-full mb-4 p-2 rounded border text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Kaydet
              </button>
            </form>
          )}

          {activeTab === "ilanListele" && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-center text-black">İlanları Listele</h2>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#FAD76F] p-4 rounded flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div>
                    <h3 className="font-bold text-black text-lg">{job.position}</h3>
                    <p className="text-sm text-black">{job.short}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded">Düzenle</button>
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        {activeTab === "mesajlar" && (
          <div className="w-full">
            <ContactMessages />
          </div>
        )}

        {activeTab === "basvurular" && (
          <div className="w-full">
            <Applications />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
