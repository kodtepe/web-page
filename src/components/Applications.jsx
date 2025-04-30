import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "applications"));
    setApplications(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  const deleteApplication = async (id) => {
    setLoading(true);
    await deleteDoc(doc(db, "applications", id));
    await fetchApplications();
  };

  const toggleReadStatus = async (id, currentStatus) => {
    setLoading(true);
    const ref = doc(db, "applications", id);
    await updateDoc(ref, {
      read: !currentStatus,
    });
    await fetchApplications();
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="space-y-4 relative">
      {/* Modern Loading Bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="h-1 w-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#f87171] via-[#facc15] to-[#4ade80] animate-[loading_1.5s_infinite]"></div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>

      <h2 className="text-xl font-bold text-center text-black">Başvuru Yapanlar</h2>

      {applications.map((app) => {
        const isExpanded = expandedIds.includes(app.id);
        return (
          <div
            key={app.id}
            className={`relative bg-[#FAD76F] p-4 rounded-2xl shadow-lg space-y-2 transition-all duration-300 ${
              isExpanded ? "max-h-full" : "overflow-hidden"
            }`}
          >
            <span
              className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                app.read ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>

            <p className="text-black">
              <strong>Adı:</strong> {app.name}
            </p>
            <p className="text-black">
              <strong>Soyadı:</strong> {app.surname}
            </p>
            <p className="text-black">
              <strong>E-mail Adresi:</strong> {app.email}
            </p>
            <p className="text-black">
              <strong>Tel No:</strong> {app.phone}
            </p>
            <p className="text-black">
              <strong>Başvurduğu Pozisyon:</strong> {app.position || "Belirtilmemiş"}
            </p>

            {isExpanded && (
              <p className="text-black">
                <strong>Tanıtım:</strong> {app.message}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => toggleExpand(app.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md shadow"
              >
                {isExpanded ? "Küçült" : "Devamını Oku"}
              </button>

              <button
                onClick={() => toggleReadStatus(app.id, app.read)}
                className={`${
                  app.read
                    ? "bg-yellow-400 hover:bg-yellow-500"
                    : "bg-gray-500 hover:bg-gray-600"
                } text-white px-4 py-1 rounded-md shadow`}
              >
                {app.read ? "Okunmadı Yap" : "Okundu Yap"}
              </button>

              <button
                onClick={() => deleteApplication(app.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md shadow"
              >
                Sil
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Applications;
