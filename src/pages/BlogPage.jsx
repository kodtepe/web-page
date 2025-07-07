import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "../components/Footer";

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const handleCardClick = (id) => navigate(`/blog/${id}`);

  useEffect(() => {
    // Sadece onaylanmış bloglar için sorgu
    const q = query(collection(db, "blogs"), where("approved", "==", true));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col bg-white">
      {/* HERO */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src="/blog.png"
          alt="Blog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70" />
        <div className="relative z-10 text-white text-center px-6">
          <h1 className="text-5xl font-bold font-mont mb-4">
            Bloglarımız
          </h1>
          <p className="text-lg font-inter text-gray-300 leading-relaxed sm:text-lg max-w-2xl mx-auto">
            Kodtepe olarak birlikte öğrenmeye, gelişime ve açık iletişime değer veriyoruz.
          </p>
        </div>
      </section>

      {/* Başlık */}
      <h2 className="text-4xl font-mont font-bold italic mb-16 pt-16 px-6 text-black text-center">
        Son Yazılar
      </h2>

      {/* Blog Grid */}
      <section className="px-6 pb-20">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => handleCardClick(blog.id)}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              {/* Sabit Kapak Görseli */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src="/kodtepeblog.png"
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* İçerik */}
              <div className="p-5 flex flex-col justify-between h-56">
                <div>
                  <h3 className="text-lg font-bold font-mont text-gray-900 mb-2 group-hover:text-yellow-500 transition">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-inter line-clamp-3">
                    {blog.content.slice(0, 120)}...
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-500 font-inter">
                    {blog.author || "Kodtepe Ekibi"}
                  </span>
                  <button
                    className="text-sm text-yellow-600 font-semibold hover:text-yellow-700 transition"
                  >
                    Daha Fazla Oku →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default BlogPage;
