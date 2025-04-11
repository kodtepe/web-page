import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [blogData, setBlogData] = useState([]);

  const handleCardClick = (index) => {
    setClickedIndex(index);
  };

  const closeModal = () => {
    setClickedIndex(null);
  };

  // Firebase'den veri çekme
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
    <div className="flex flex-col min-h-screen">
      {/* HERO */}
      <section className="relative w-full h-[70vh] overflow-hidden flex items-center justify-center">
        <img
          src="/anasayfa.png"
          alt="Kodun Gücüyle Zirveye"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-white px-6 text-center max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Kodun Gücüyle Zirveye
          </h1>
          <p className="text-base sm:text-lg">
            Yenilikçi bakış açımızla kodu sadece üretmiyor, aynı zamanda
            tasarlıyor ve sürdürüyoruz. Kodtepe olarak hedefimiz, işinizi
            yazılımın zirvesine taşımak.
          </p>
        </div>
      </section>

      {/* BLOG BÖLÜMÜ */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-4xl font-semibold mb-24 text-black">Bloglarımız</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {blogData.map((blog, index) => (
            <div
              key={blog.id}
              onClick={() => handleCardClick(index)}
              className="relative group bg-gradient-to-br from-yellow-400 to-white h-48 rounded-lg shadow-md flex items-end justify-center p-4 text-black text-base font-medium overflow-hidden transition duration-300 hover:shadow-lg cursor-pointer"
            >
              {clickedIndex !== index && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out z-20">
                  <span className="text-xl font-semibold text-white bg-black bg-opacity-70 px-4 py-2 rounded-lg">
                    Daha fazla
                  </span>
                </div>
              )}
              <span className="relative z-10 group-hover:opacity-60 transition text-center">
                {blog.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {clickedIndex !== null && blogData[clickedIndex] && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 text-left shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2 text-black">
              {blogData[clickedIndex].title}
            </h3>
            <p className="text-gray-700 mb-4 whitespace-pre-line">
              {blogData[clickedIndex].summary}
            </p>
            <Link
              to={`/blog/${blogData[clickedIndex].id}`}
              className="inline-block mt-2 text-white bg-yellow-500 hover:bg-yellow-600 font-semibold px-4 py-2 rounded-md transition"
            >
              Blog Detayına Git
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MainPage;