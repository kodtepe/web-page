import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "../components/Footer";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogRef = doc(db, "blogs", id);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
          setBlog(blogSnap.data());
        } else {
          console.log("Blog bulunamadı");
        }
      } catch (error) {
        console.error("Blog verisi alınırken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-lg font-inter">
        Yükleniyor...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-lg font-inter">
        Blog bulunamadı.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-inter">
      {/* Başlık Alanı */}
      <header className="bg-black text-white text-center py-14 px-6 shadow-md">
        <h1 className="text-3xl sm:text-5xl font-bold font-mont animate-fade-in-up">
          {blog.title}
        </h1>
      </header>

      {/* İçerik */}
      <main className="flex-grow px-6 py-16 max-w-4xl mx-auto">
        <article className="text-gray-700 leading-relaxed whitespace-pre-line text-lg font-inter animate-fade-in-up">
          {blog.summary}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;
