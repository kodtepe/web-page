import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import CareerSection from "../components/CareerSection";
import AboutSection from "../components/AboutSection";

const MainPage = () => {
  const [blogData, setBlogData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          where("approved", "==", true) // SADECE ONAYLANMIŞ BLOG
        );
        const snapshot = await getDocs(q);
        const blogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogData(blogs);
      } catch (error) {
        console.error("Bloglar yüklenirken hata oluştu:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-mulish bg-white text-black">
      {/* HERO */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src="/anasayfa.png"
          alt="Kodun Gücüyle Zirveye"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white px-6 text-center max-w-5xl">
          <h1 className="text-5xl font-bold font-mont mb-2 animate-fade-in-up">KODTEPE</h1>
          <h2 className="text-3xl sm:text-4xl font-bold font-mont mb-4 animate-fade-in-up">
            Yenilikçi Yazılım Çözümleri
          </h2>
          <p className="text-lg font-inter text-gray-300 animate-fade-in-up">
            Yenilikçi ve sade yazılım çözümleriyle iş süreçlerinizi dijital çağa taşıyoruz.
          </p>
        </div>
      </section>

      {/* BLOG BAŞLIK */}
      <div className="w-full bg-black py-6 flex justify-center">
        <h2 className="text-3xl text-[#F4D16A] font-bold font-mont">Bloglarımız</h2>
      </div>

      {/* BLOG BÖLÜMÜ */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[...blogData]
            .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
            .slice(0, 3)
            .map((blog) => (
              <div
                key={blog.id}
                onClick={() => navigate(`/blog/${blog.id}`)}
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
                      {(blog.summary || blog.content)?.slice(0, 120)}...
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-500 font-inter">
                      {blog.author || "Kodtepe"}
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
        <div className="max-w-6xl mx-auto text-right mt-6">
          <Link
            to="/blog"
            className="text-yellow-600 underline font-inter font-medium hover:text-yellow-800 transition"
          >
            Tüm Bloglar ➜
          </Link>
        </div>
      </section>

      {/* BOŞLUK: Blog -> About */}
      <div className="py-24 sm:py-32" />

      {/* ABOUT BAŞLIK */}
      <div className="w-full bg-black py-6 flex justify-center">
        <h2 className="text-3xl text-[#F4D16A] font-bold font-mont">Hakkımızda</h2>
      </div>

      <AboutSection />

      {/* BOŞLUK: About -> Contact */}
      <div className="py-24 sm:py-32" />

      {/* CONTACT BAŞLIK */}
      <div className="w-full bg-black py-6 flex justify-center">
        <h2 className="text-3xl text-[#F4D16A] font-bold font-mont">İletişim</h2>
      </div>

      <ContactSection />

      {/* BOŞLUK: Contact -> Career */}
      <div className="py-24 sm:py-32" />

      {/* CAREER BAŞLIK */}
      <div className="w-full bg-black py-6 flex justify-center">
        <h2 className="text-3xl text-[#F4D16A] font-bold font-mont">Kariyer</h2>
      </div>

      <CareerSection />

    </div>
  );
};

export default MainPage;
