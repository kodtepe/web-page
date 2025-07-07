import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const fetchedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Mesajlar alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "contacts", id));
      fetchMessages();
    } catch (error) {
      console.error("Silme işlemi sırasında hata:", error);
      setLoading(false);
    }
  };

  const toggleReadStatus = async (id, currentStatus) => {
    setLoading(true);
    try {
      const ref = doc(db, "contacts", id);
      await updateDoc(ref, {
        read: !currentStatus,
      });
      fetchMessages();
    } catch (error) {
      console.error("Okundu durumu güncellenemedi:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="relative space-y-6">
      {/* Modern Loading Bar */}
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

      <h2 className="text-2xl font-bold text-center text-gray-800">Gelen Mesajlar</h2>

      {messages.length === 0 && !loading ? (
        <p className="text-center text-gray-500">Hiç mesaj bulunamadı.</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-lg text-gray-800">{msg.name}</h3>
              <p className="text-gray-600">{msg.message}</p>
              <span
                className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                  msg.read ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {msg.read ? "Okundu" : "Okunmadı"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleReadStatus(msg.id, msg.read)}
                className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-3 py-1 rounded transition"
              >
                {msg.read ? "Okunmadı Yap" : "Okundu Yap"}
              </button>
              <button
                onClick={() => deleteMessage(msg.id)}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded transition"
              >
                Sil
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ContactMessages;
