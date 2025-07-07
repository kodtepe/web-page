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
    await updateDoc(ref, { read: !currentStatus });
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
    <div className="space-y-6 relative">
      {loading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="h-1 w-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#f87171] via-[#facc15] to-[#4ade80] animate-[loading_1.5s_infinite]" />
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>

      <h2 className="text-2xl font-bold text-center text-gray-800">Başvuru Yapanlar</h2>

      {applications.length === 0 && !loading ? (
        <p className="text-center text-gray-500">Henüz başvuru yapılmamış.</p>
      ) : (
        applications.map((app) => {
          const isExpanded = expandedIds.includes(app.id);
          return (
            <div
              key={app.id}
              className={`bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 ${
                isExpanded ? "max-h-full" : "overflow-hidden"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{app.name} {app.surname}</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Pozisyon:</strong> {app.position || "Belirtilmemiş"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {app.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Tel:</strong> {app.phone}
                  </p>
                </div>
                <span
                  className={`w-3 h-3 rounded-full mt-1 ${
                    app.read ? "bg-green-500" : "bg-red-500"
                  }`}
                  title={app.read ? "Okundu" : "Okunmadı"}
                />
              </div>

              {isExpanded && (
                <p className="mt-3 text-gray-700">
                  <strong>Tanıtım:</strong> {app.message}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => toggleExpand(app.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                >
                  {isExpanded ? "Küçült" : "Devamını Oku"}
                </button>
                <button
                  onClick={() => toggleReadStatus(app.id, app.read)}
                  className={`${
                    app.read
                      ? "bg-yellow-400 hover:bg-yellow-500"
                      : "bg-gray-500 hover:bg-gray-600"
                  } text-white px-4 py-1 rounded`}
                >
                  {app.read ? "Okunmadı Yap" : "Okundu Yap"}
                </button>
                <button
                  onClick={() => deleteApplication(app.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Sil
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Applications;
