import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore"; // 🔁 getDocs yerine
import { db } from "../firebase";
import Footer from "../components/Footer";

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const handleCardClick = (id) => navigate(`/blog/${id}`);

  // Firestore'dan anlık blog verisini dinle
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
      const blogList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  // Scroll efektleri
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".scroll-fade");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col bg-white">
      {/* HERO */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <img src="/blog.png" alt="Blog" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-70" />
        <div className="relative z-10 text-white text-center px-6">
          <h1 className="text-5xl font-bold font-mont mb-4 scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-in-out">
            Bloglarımız
          </h1>
          <p className="text-lg font-inter text-gray-300 leading-relaxed scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-in-out sm:text-lg max-w-2xl mx-auto">
            Kodtepe olarak birlikte öğrenmeye, gelişime ve açık iletişime değer veriyoruz. Yenilikçi çözümler üretirken
            eğlenmeyi, paylaşmayı ve sürekli gelişmeyi önemsiyoruz.
          </p>
        </div>
      </section>

      {/* Başlık */}
      <h2 className="text-4xl font-mont font-bold italic mb-20 pt-16 px-6 text-black text-center scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-in-out">
        Bloglarımız
      </h2>

      {/* Bloglar */}
      <section className="px-6 pb-20 text-center">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-in-out">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => handleCardClick(blog.id)}
              className="relative group bg-gradient-to-br from-yellow-400 to-white h-48 rounded-xl shadow-md flex items-end justify-center p-4 cursor-pointer hover:shadow-xl transition"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out z-20">
                <span className="text-base font-semibold font-inter text-white bg-black bg-opacity-70 px-4 py-2 rounded-lg">
                  Daha fazla
                </span>
              </div>
              <span className="relative z-10 font-mont text-lg text-gray-700 font-semibold group-hover:opacity-60 transition">
                {blog.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
