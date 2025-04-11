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
    return <div className="text-center py-20 text-gray-600">Yükleniyor...</div>;
  }

  if (!blog) {
    return <div className="text-center py-20 text-red-600">Blog bulunamadı.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Başlık Alanı */}
      <header className="bg-black text-white text-center py-10">
        <h1 className="text-3xl sm:text-4xl font-bold">{blog.title}</h1>
      </header>

      {/* İçerik Alanı */}
      <main className="flex-grow px-6 py-12 max-w-4xl mx-auto text-justify">
        <article className="text-gray-800 leading-relaxed whitespace-pre-line">
          {blog.summary}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;
