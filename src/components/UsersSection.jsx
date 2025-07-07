import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import UserProfileSection from "./UserProfileSection";

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "users"));
    const userList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(userList);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: newUser.name,
        email: newUser.email,
        role: "member",
      });

      await auth.signOut();

      alert("Üye başarıyla eklendi!");
      setNewUser({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Hata oluştu: " + error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
      await deleteDoc(doc(db, "users", id));
      alert("Kullanıcı silindi.");
      fetchUsers();
      setSelectedUser(null);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center text-black mb-8 mt-10">
          Üye Yönetimi
        </h2>

        {selectedUser ? (
          <UserProfileSection
            user={selectedUser}
            onBack={() => setSelectedUser(null)}
          />
        ) : (
          <>
            {/* Üye Ekle Formu */}
            <form
              onSubmit={handleAddUser}
              className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 w-full transition-transform hover:scale-[1.01]"
            >
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
                Yeni Üye Ekle
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Üye Adı"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="border rounded px-3 py-2 text-black w-full"
                />
                <input
                  type="email"
                  placeholder="Üye Mail"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="border rounded px-3 py-2 text-black w-full"
                />
                <input
                  type="password"
                  placeholder="Üye Şifresi"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="border rounded px-3 py-2 text-black w-full"
                />
                <input
                  type="password"
                  placeholder="Şifre Tekrar"
                  value={newUser.confirmPassword}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="border rounded px-3 py-2 text-black w-full"
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded w-full"
              >
                Kaydet
              </button>
            </form>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 bg-yellow-400 text-black hover:bg-yellow-500 font-semibold px-4 py-2 rounded w-full"
            >
              Kayıtlı Üyeleri Görüntüle
            </button>
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-full md:w-[400px] bg-white h-full p-6 overflow-y-auto shadow-2xl transition-transform duration-300 transform translate-x-0">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
              Kayıtlı Üyeler
            </h3>

            {loading ? (
              <p className="text-center text-gray-500">Yükleniyor...</p>
            ) : users.length > 0 ? (
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white border border-gray-300 shadow-black p-3 rounded-lg flex justify-between items-center gap-2 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div>
                      <h4 className="font-semibold text-black">{user.name}</h4>
                      <p className="text-xs text-black">{user.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsModalOpen(false);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Profil
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">Hiç üye bulunamadı.</p>
            )}

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 bg-gray-300 hover:bg-gray-400 text-black w-full py-2 rounded"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersSection;
