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
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>

      <h2 className="text-xl font-bold text-center text-black">Mesajlar</h2>

      {messages.length === 0 && !loading ? (
        <p className="text-center text-gray-500">Hiç mesaj bulunamadı.</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-[#FAD76F] p-4 rounded-2xl shadow-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-black text-lg">{msg.name}</h3>
              <p className="text-black text-sm mt-1">{msg.message}</p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  msg.read ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>

              <button
                onClick={() => toggleReadStatus(msg.id, msg.read)}
                className={`${
                  msg.read
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-gray-500 hover:bg-gray-600"
                } text-white px-4 py-1 rounded-md shadow`}
              >
                {msg.read ? "Okunmadı Yap" : "Okundu Yap"}
              </button>

              <button
                onClick={() => deleteMessage(msg.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md shadow"
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
