import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "../components/Footer";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog(docSnap.data());
      } else {
        setBlog(null);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="text-center text-xl font-bold p-20">
        Blog bulunamadı.
      </div>
    );
  }

  const formatDate = (timestamp) => {
    const date = timestamp?.toDate?.();
    return date
      ? date.toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "Tarih belirtilmedi";
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="flex-1 w-full max-w-5xl mx-auto px-6 py-16 flex flex-col gap-12">
        <button
          onClick={() => navigate("/blog")}
          className="self-start bg-yellow-400 text-black font-semibold px-5 py-2 rounded-md hover:bg-yellow-500 transition"
        >
          ◀ Geri Dön
        </button>

        <div className="flex justify-end text-sm text-gray-600 font-semibold">
          {formatDate(blog.createdAt)}
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-black">{blog.title}</h1>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line font-mulish text-lg">
            {blog.content}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-10 pt-12 border-t border-gray-300">
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">Yazan Kişi</h3>
            <p className="text-black font-bold">{blog.author || "Kodtepe Ekibi"}</p>
          </div>

          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-2">Etiketler</h3>
            <div className="flex flex-wrap gap-3">
              {Array.isArray(blog.tags) &&
                blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogDetailPage;
