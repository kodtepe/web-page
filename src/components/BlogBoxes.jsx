import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const BlogBoxes = () => {
  const [approvedBlogs, setApprovedBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [rejectedBlogs, setRejectedBlogs] = useState([]);
  const [activeModal, setActiveModal] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribes = [];

    const setupListener = (queryRef, setter) => {
      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        setter(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
      unsubscribes.push(unsubscribe);
    };

    const approvedQuery = query(
      collection(db, "blogs"),
      where("authorId", "==", auth.currentUser.uid),
      where("approved", "==", true)
    );

    const pendingQuery = query(
      collection(db, "blogs"),
      where("authorId", "==", auth.currentUser.uid),
      where("approved", "==", false)
    );

    const rejectedQuery = query(
      collection(db, "blogs"),
      where("authorId", "==", auth.currentUser.uid),
      where("approved", "==", null)
    );

    setupListener(approvedQuery, setApprovedBlogs);
    setupListener(pendingQuery, setPendingBlogs);
    setupListener(rejectedQuery, setRejectedBlogs);

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, []);

  const getBlogsByType = (type) => {
    switch (type) {
      case "approved":
        return approvedBlogs;
      case "pending":
        return pendingBlogs;
      case "rejected":
        return rejectedBlogs;
      default:
        return [];
    }
  };

  const Box = ({ title, count, color, type }) => (
    <div
      onClick={() => setActiveModal(type)}
      className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition bg-${color}-50`}
    >
      <h3 className={`text-lg font-bold text-${color}-700`}>
        {title} ({count})
      </h3>
    </div>
  );

  return (
    <>
      {/* KUTULAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <Box
          title="Onaylanan Bloglar"
          count={approvedBlogs.length}
          color="green"
          type="approved"
        />
        <Box
          title="Onay Bekleyen Bloglar"
          count={pendingBlogs.length}
          color="yellow"
          type="pending"
        />
        <Box
          title="Onaylanmamış Bloglar"
          count={rejectedBlogs.length}
          color="red"
          type="rejected"
        />
      </div>

      {/* MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {activeModal === "approved" && "Onaylanan Bloglar"}
                {activeModal === "pending" && "Onay Bekleyen Bloglar"}
                {activeModal === "rejected" && "Onaylanmamış Bloglar"}
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-gray-600 hover:text-black text-xl"
              >
                ×
              </button>
            </div>

            {getBlogsByType(activeModal).length > 0 ? (
              <div className="grid gap-3">
                {getBlogsByType(activeModal).map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => {
                      if (activeModal === "approved") {
                        navigate(`/blog/${blog.id}`);
                      }
                    }}
                    className={`border rounded p-3 cursor-${
                      activeModal === "approved" ? "pointer" : "default"
                    } hover:shadow-sm transition bg-${
                      activeModal === "approved"
                        ? "green"
                        : activeModal === "pending"
                        ? "yellow"
                        : "red"
                    }-50`}
                  >
                    <h4
                      className={`font-semibold text-${
                        activeModal === "approved"
                          ? "green"
                          : activeModal === "pending"
                          ? "yellow"
                          : "red"
                      }-800 mb-1 truncate`}
                    >
                      {blog.title || "Başlıksız"}
                    </h4>
                    {blog.createdAt && (
                      <p className="text-xs text-gray-500">
                        {blog.createdAt.toDate().toLocaleDateString()}
                      </p>
                    )}
                    {activeModal === "approved" && (
                      <p
                        className={`text-xs mt-1 text-${
                          activeModal === "approved"
                            ? "green"
                            : activeModal === "pending"
                            ? "yellow"
                            : "red"
                        }-700`}
                      >
                        Detaya gitmek için tıkla
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Bu kategoride blog bulunmuyor.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogBoxes;
