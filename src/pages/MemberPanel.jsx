import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import Footer from "../components/Footer";
import ProfileSection from "../components/ProfileSection";

const MemberPanel = () => {
  const [activeTab, setActiveTab] = useState("profil");
  const [blogs, setBlogs] = useState([]);
  const [blogInput, setBlogInput] = useState({
    title: "",
    summary: "",
    content: "",
    tags: "",
  });
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          if (!data.createdAt) {
            await updateDoc(userRef, {
              createdAt: new Date(),
            });
          }

          await updateDoc(userRef, {
            lastSeen: new Date(),
          });

          const updatedSnap = await getDoc(userRef);
          setUserInfo(updatedSnap.data());
        } else {
          await setDoc(userRef, {
            email: currentUser.email,
            name: "",
            role: "member",
            createdAt: new Date(),
            lastSeen: new Date(),
            photoURL: "",
          });
          const newSnap = await getDoc(userRef);
          setUserInfo(newSnap.data());
        }

        fetchBlogs(currentUser.uid);
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchBlogs = async (uid) => {
    const q = query(collection(db, "blogs"), where("authorId", "==", uid));
    const querySnapshot = await getDocs(q);

    setBlogs(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );

    setUserInfo((prev) => ({
      ...prev,
      blogCount: querySnapshot.size,
    }));
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const addBlog = async (e) => {
    e.preventDefault();
    const tagsArray = blogInput.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    await addDoc(collection(db, "blogs"), {
      ...blogInput,
      tags: tagsArray,
      authorId: user.uid,
      approved: false,
    });

    setBlogInput({ title: "", summary: "", content: "", tags: "" });
    fetchBlogs(user.uid);
    setActiveTab("blogListele");
  };

  const deleteBlog = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
    fetchBlogs(user.uid);
  };

  const handleEditBlog = (blog) => {
    setBlogInput({
      title: blog.title,
      summary: blog.summary,
      content: blog.content,
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags,
    });
    deleteBlog(blog.id);
    setActiveTab("blogEkle");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-black text-white flex flex-col p-6 space-y-6 text-lg">
          <h2 className="text-2xl font-bold text-center text-[#FAD76F]">Kodtepe Üye</h2>
          <nav className="flex flex-col gap-4 text-left">
            <button
              onClick={() => setActiveTab("profil")}
              className={`${
                activeTab === "profil"
                  ? "text-[#FAD76F]"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              Profil
            </button>
            <button
              onClick={() => setActiveTab("blogEkle")}
              className={`${
                activeTab === "blogEkle"
                  ? "text-[#FAD76F]"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              Blog Ekle
            </button>
            <button
              onClick={() => setActiveTab("blogListele")}
              className={`${
                activeTab === "blogListele"
                  ? "text-[#FAD76F]"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              Blogları Listele
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
        <main className="flex-1 bg-gray-50 p-6 overflow-auto">
          {activeTab === "profil" && (
            <ProfileSection userInfo={userInfo} blogs={blogs} />
          )}

          {activeTab === "blogEkle" && (
  <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
      Yeni Blog Ekle
    </h2>
    <form onSubmit={addBlog} className="space-y-4">
      <div>
        <label className="block mb-1 text-gray-700">Başlık</label>
        <input
          type="text"
          value={blogInput.title}
          onChange={(e) =>
            setBlogInput({ ...blogInput, title: e.target.value })
          }
          placeholder="Blog başlığınızı girin"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
          required
        />
      </div>
      <div>
        <label className="block mb-1 text-gray-700">Etiketler</label>
        <input
          type="text"
          value={blogInput.tags}
          onChange={(e) =>
            setBlogInput({ ...blogInput, tags: e.target.value })
          }
          placeholder="Virgülle ayırın (örn: yazılım, teknoloji)"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
        />
      </div>
      <div>
        <label className="block mb-1 text-gray-700">Özet</label>
        <textarea
          rows={3}
          value={blogInput.summary}
          onChange={(e) =>
            setBlogInput({ ...blogInput, summary: e.target.value })
          }
          placeholder="Kısa bir özet yazın"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
        />
      </div>
      <div>
        <label className="block mb-1 text-gray-700">İçerik</label>
        <textarea
          rows={6}
          value={blogInput.content}
          onChange={(e) =>
            setBlogInput({ ...blogInput, content: e.target.value })
          }
          placeholder="Blog içeriğini buraya yazın"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded font-medium transition"
        >
          Kaydet
        </button>
      </div>
    </form>
  </div>
)}

  {activeTab === "blogListele" && (
  <div className="max-w-4xl mx-auto space-y-4">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
       Yayınladığınız Bloglar
    </h2>
    {blogs.map((blog) => (
      <div
        key={blog.id}
        className="border border-gray-200 bg-white rounded-xl shadow p-5 hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{blog.summary}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {blog.tags &&
              blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleEditBlog(blog)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded transition"
          >
            Düzenle
          </button>
          <button
            onClick={() => deleteBlog(blog.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
          >
            Sil
          </button>
        </div>
        <span
          className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
            blog.approved ? "bg-green-500" : "bg-red-500"
          }`}
          title={blog.approved ? "Onaylı" : "Onay Bekliyor"}
        ></span>
      </div>
    ))}
    {blogs.length === 0 && (
      <p className="text-center text-gray-500 mt-4">
        Henüz bir blog yazmadınız.
      </p>
    )}
  </div>
)}

        </main>
      </div>
    </div>
  );
};

export default MemberPanel;