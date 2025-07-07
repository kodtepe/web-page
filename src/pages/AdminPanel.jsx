import { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import ContactMessages from "../components/ContactMessages";
import Applications from "../components/Applications";
import UsersSection from "../components/UsersSection";
import OnayBekleyenBloglar from "../components/OnayBekleyenBloglar";
import ProfileSection from "../components/ProfileSection";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("blogEkle");
  const [blogs, setBlogs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [blogInput, setBlogInput] = useState({
    title: "",
    summary: "",
    content: "",
    tags: "",
  });
  const [jobInput, setJobInput] = useState({
    position: "",
    short: "",
    detail: "",
  });

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  const fetchBlogs = async () => {
    const snapshot = await getDocs(collection(db, "blogs"));
    setBlogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const fetchJobs = async () => {
    const snapshot = await getDocs(collection(db, "jobs"));
    setJobs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchBlogs();
    fetchJobs();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Önce admins kontrol et
        const adminSnap = await getDoc(doc(db, "admins", currentUser.email));
        if (adminSnap.exists()) {
          setUserInfo({
            ...adminSnap.data(),
            email: currentUser.email,
            role: "admin",
            collectionName: "admins",
          });
          setLoadingUser(false);
          return; // Admin bulunduysa çık
        }
        // Sonra users kontrol et
        const userSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (userSnap.exists()) {
          setUserInfo({
            ...userSnap.data(),
            email: currentUser.email,
            role: "member",
            collectionName: "users",
          });
        }
      }
      setLoadingUser(false);
    });
  }, []);

  const addBlog = async (e) => {
    e.preventDefault();
    const tagsArray = blogInput.tags.split(",").map((tag) => tag.trim());
    await addDoc(collection(db, "blogs"), {
      ...blogInput,
      tags: tagsArray,
      createdAt: new Date(),
      approved: false,
      authorEmail: userInfo?.email || "",
    });
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

  const handleEditBlog = (blog) => {
    setBlogInput({
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags,
    });
    setActiveTab("blogEkle");
  };

  const renderTags = (tags) => {
    if (!tags) return null;
    const tagArray = Array.isArray(tags) ? tags : String(tags).split(",");
    return tagArray.map((tag, index) => (
      <span
        key={index}
        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-2"
      >
        #{tag.trim()}
      </span>
    ));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="bg-black text-white flex flex-col p-6 space-y-6 text-lg w-full lg:w-64">
        <h2 className="text-2xl font-bold text-[#FAD76F]">Kodtepe Panel</h2>
        <nav className="flex flex-col gap-4 text-left">
          <button onClick={() => setActiveTab("profil")} className={activeTab === "profil" ? "text-[#FAD76F]" : "text-white"}>Profil</button>
          <button onClick={() => setActiveTab("blogEkle")} className={activeTab === "blogEkle" ? "text-[#FAD76F]" : "text-white"}>Blog Ekle</button>
          <button onClick={() => setActiveTab("blogListele")} className={activeTab === "blogListele" ? "text-[#FAD76F]" : "text-white"}>Blogları Listele</button>
          <button onClick={() => setActiveTab("ilanEkle")} className={activeTab === "ilanEkle" ? "text-[#FAD76F]" : "text-white"}>İlan Ekle</button>
          <button onClick={() => setActiveTab("ilanListele")} className={activeTab === "ilanListele" ? "text-[#FAD76F]" : "text-white"}>İlanları Listele</button>
          {userInfo?.role === "admin" && (
            <>
              <button onClick={() => setActiveTab("mesajlar")} className={activeTab === "mesajlar" ? "text-[#FAD76F]" : "text-white"}>Mesajlar</button>
              <button onClick={() => setActiveTab("basvurular")} className={activeTab === "basvurular" ? "text-[#FAD76F]" : "text-white"}>Başvurular</button>
              <button onClick={() => setActiveTab("uyeleriGoruntule")} className={activeTab === "uyeleriGoruntule" ? "text-[#FAD76F]" : "text-white"}>Üyeleri Görüntüle</button>
              <button onClick={() => setActiveTab("onayBekleyenBloglar")} className={activeTab === "onayBekleyenBloglar" ? "text-[#FAD76F]" : "text-white"}>Onay Bekleyen Bloglar</button>
            </>
          )}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-md transition"
        >
          Çıkış Yap
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto space-y-6">
        {loadingUser ? (
          <p className="text-center text-gray-500">Yükleniyor...</p>
        ) : !userInfo ? (
          <p className="text-center text-red-500">Kullanıcı bulunamadı.</p>
        ) : (
          <>
            {activeTab === "profil" && (
              <ProfileSection
                userInfo={userInfo}
                blogs={blogs}
                collectionName={userInfo.collectionName}
              />
            )}

            {activeTab === "blogEkle" && (
              <form
                onSubmit={addBlog}
                className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto space-y-4"
              >
                <h2 className="text-2xl font-bold text-center text-gray-800">Yeni Blog Ekle</h2>
                <input
                  type="text"
                  placeholder="Başlık"
                  value={blogInput.title}
                  onChange={(e) => setBlogInput({ ...blogInput, title: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-black"
                />
                <input
                  type="text"
                  placeholder="Etiketler (virgülle ayırın)"
                  value={blogInput.tags}
                  onChange={(e) => setBlogInput({ ...blogInput, tags: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-black"
                />
                <textarea
                  placeholder="Özet"
                  rows={3}
                  value={blogInput.summary}
                  onChange={(e) => setBlogInput({ ...blogInput, summary: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-black"
                />
                <textarea
                  placeholder="İçerik"
                  rows={6}
                  value={blogInput.content}
                  onChange={(e) => setBlogInput({ ...blogInput, content: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-black"
                />
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded">
                  Kaydet
                </button>
              </form>
            )}

            {activeTab === "blogListele" && (
              <div className="space-y-4 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800">Bloglar</h2>
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{blog.title}</h3>
                      <p className="text-sm text-gray-600">{blog.summary}</p>
                      <div className="mt-2">{renderTags(blog.tags)}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded"
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
              <form
                onSubmit={addJob}
                className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto space-y-4"
              >
                <h2 className="text-2xl font-bold text-center text-gray-800">Yeni İlan Ekle</h2>
                <input
                  type="text"
                  placeholder="Pozisyon"
                  value={jobInput.position}
                  onChange={(e) => setJobInput({ ...jobInput, position: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-black"
                />
                <textarea
                  placeholder="Kısa Açıklama"
                  rows={3}
                  value={jobInput.short}
                  onChange={(e) => setJobInput({ ...jobInput, short: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-black"
                />
                <textarea
                  placeholder="Detaylı Açıklama"
                  rows={6}
                  value={jobInput.detail}
                  onChange={(e) => setJobInput({ ...jobInput, detail: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-black"
                />
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded">
                  Kaydet
                </button>
              </form>
            )}

            {activeTab === "ilanListele" && (
              <div className="space-y-4 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800">İlanlar</h2>
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{job.position}</h3>
                      <p className="text-sm text-gray-600">{job.short}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded">
                        Düzenle
                      </button>
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

            {activeTab === "mesajlar" && <ContactMessages />}
            {activeTab === "uyeleriGoruntule" && <UsersSection />}
            {activeTab === "onayBekleyenBloglar" && <OnayBekleyenBloglar />}
            {activeTab === "basvurular" && <Applications />}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
