import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const OnayBekleyenBloglar = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchPendingBlogs = async () => {
    const q = query(collection(db, "blogs"), where("approved", "==", false));
    const snapshot = await getDocs(q);
    setBlogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchPendingBlogs();
  }, []);

  const approveBlog = async (id) => {
    const blogRef = doc(db, "blogs", id);
    await updateDoc(blogRef, { approved: true });
    fetchPendingBlogs();
  };

  const deleteBlog = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
    fetchPendingBlogs();
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="space-y-4 w-full max-w-4xl mx-auto overflow-y-auto max-h-[80vh]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mt-10 mb-6">
          Onay Bekleyen Bloglar
        </h2>

        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white border border-gray-200 p-4 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-lg transition"
          >
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-800">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600">{blog.summary}</p>
              <div className="flex flex-wrap gap-2">
                {blog.tags &&
                  blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => approveBlog(blog.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md transition"
              >
                Onayla
              </button>
              <button
                onClick={() => deleteBlog(blog.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
              >
                Sil
              </button>
            </div>
          </div>
        ))}

        {blogs.length === 0 && (
          <p className="text-center text-gray-500">
            Onay bekleyen blog yok.
          </p>
        )}
      </div>
    </div>
  );
};

export default OnayBekleyenBloglar;
