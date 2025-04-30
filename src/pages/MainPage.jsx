import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import CareerSection from "../components/CareerSection";
import AboutSection from "../components/AboutSection";

const MainPage = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [blogData, setBlogData] = useState([]);

  const handleCardClick = (index) => {
    setClickedIndex(index);
  };

  const closeModal = () => {
    setClickedIndex(null);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "blogs"));
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

      {/* BLOG */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[...blogData]
            .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds) // createdAt varsa sıralar
            .slice(0, 3) // sadece son 3 blog
            .map((blog, index) => (
              <div
                key={blog.id}
                onClick={() => handleCardClick(index)}
                className="relative group bg-gradient-to-br from-yellow-400 to-white h-48 rounded-xl shadow-md flex items-end justify-center p-4 cursor-pointer transition duration-300 hover:shadow-xl"
              >
                {!clickedIndex && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out z-20">
                    <span className="text-base font-semibold font-inter text-white bg-black bg-opacity-70 px-4 py-2 rounded-lg">
                      Daha fazla
                    </span>
                  </div>
                )}
                <span className="relative z-10 font-mont text-lg text-gray-700 font-semibold group-hover:opacity-60 transition">
                  {blog.title}
                </span>
              </div>
            ))}
        </div>
        <div className="max-w-6xl mx-auto text-right mt-6">
          <Link
            to="/blog"
            className="text-blue-600 underline font-inter font-medium hover:text-blue-800 transition"
          >
            Bloglarımız ➜
          </Link>
        </div>
      </section>

      {/* MODAL */}
      {clickedIndex !== null && blogData[clickedIndex] && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-left shadow-2xl relative animate-fade-in-up">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-3 font-mont">{blogData[clickedIndex].title}</h3>
            <p className="text-gray-700 mb-4 font-inter whitespace-pre-line">
              {blogData[clickedIndex].summary}
            </p>
            <Link
              to={`/blog/${blogData[clickedIndex].id}`}
              className="inline-block mt-2 text-white bg-yellow-500 hover:bg-yellow-600 font-semibold font-mulish px-4 py-2 rounded-md transition"
            >
              Blog Detayına Git
            </Link>
          </div>
        </div>
      )}

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

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default MainPage;
