import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const UserProfileSection = ({ user, onBack }) => {
  const [userBlogs, setUserBlogs] = useState([]);

const fetchUserBlogs = async () => {
  const q = query(
    collection(db, "blogs"),
    where("authorId", "==", user.uid)
  );
  const snapshot = await getDocs(q);
  console.log("Fetched blogs for user:", user.uid, snapshot.docs);
  setUserBlogs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
};


  useEffect(() => {
    fetchUserBlogs();
  }, [user]);

  // Onay durumlarını say
  const approvedCount = userBlogs.filter((b) => b.approved === true).length;
  const pendingCount = userBlogs.filter((b) => b.approved === false).length;
  const unapprovedCount = userBlogs.filter((b) => b.approved === undefined).length;

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition"
      >
        ← Geri Dön
      </button>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          {user.name || "İsimsiz Kullanıcı"} Profili
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">E-mail:</span> {user.email}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Rol:</span> {user.role}
            </p>
            {user.createdAt && (
              <p className="text-gray-700">
                <span className="font-medium">Kayıt Tarihi:</span>{" "}
                {user.createdAt.toDate().toLocaleString()}
              </p>
            )}
            {user.lastSeen && (
              <p className="text-gray-700">
                <span className="font-medium">Son Görülme:</span>{" "}
                {user.lastSeen.toDate().toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Onay Durumu Kutuları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center bg-red-400 text-white p-4 rounded">
          <span className="text-3xl font-bold">{unapprovedCount}</span>
          <span className="text-sm">Onaylanmamış</span>
        </div>
        <div className="flex flex-col items-center bg-yellow-400 text-black p-4 rounded">
          <span className="text-3xl font-bold">{pendingCount}</span>
          <span className="text-sm">Onay Bekleyen</span>
        </div>
        <div className="flex flex-col items-center bg-green-400 text-white p-4 rounded">
          <span className="text-3xl font-bold">{approvedCount}</span>
          <span className="text-sm">Onaylanmış</span>
        </div>
      </div>

      {/* Yazdığı Bloglar */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
        <h4 className="text-xl font-semibold mb-4 text-gray-800">
          Yazdığı Bloglar
        </h4>
        {userBlogs.length === 0 && (
          <p className="text-gray-600 text-sm">Henüz blog yazmamış.</p>
        )}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
          {userBlogs.map((blog) => (
            <div
              key={blog.id}
              className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow transition"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-3 h-3 mt-1 rounded-full ${
                    blog.approved
                      ? "bg-green-500"
                      : blog.approved === false
                      ? "bg-yellow-400"
                      : "bg-red-500"
                  }`}
                ></span>
                <div>
                  <h5 className="text-gray-800 font-medium">{blog.title}</h5>
                  <p className="text-gray-600 text-sm">
                    {blog.summary ? `${blog.summary.slice(0, 80)}...` : "Özet yok"}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  blog.approved
                    ? "bg-green-100 text-green-700"
                    : blog.approved === false
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {blog.approved
                  ? "Onaylı"
                  : blog.approved === false
                  ? "Onay Bekliyor"
                  : "Onaylanmamış"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;
