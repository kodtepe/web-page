import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import BlogBoxes from "./BlogBoxes";

import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

const ProfileSection = ({ userInfo, blogs, collectionName }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    photoBase64: "",
    newPassword: "",
    currentPassword: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const updates = {};

    if (editForm.name) updates.name = editForm.name;
    if (editForm.photoBase64) updates.photoURL = editForm.photoBase64;

    // Firestore güncelleme
    if (Object.keys(updates).length > 0) {
      const docId =
        collectionName === "admins"
          ? auth.currentUser.email
          : auth.currentUser.uid;

      const userRef = doc(db, collectionName, docId);
      await updateDoc(userRef, updates);
    }

    // Şifre değiştirme
    if (editForm.newPassword) {
      if (!editForm.currentPassword) {
        alert("Şifre değiştirmek için mevcut şifrenizi girin.");
        return;
      }

      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        editForm.currentPassword
      );

      try {
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, editForm.newPassword);
      } catch (error) {
        console.error("Şifre güncelleme hatası:", error);
        alert("Şifre güncellenemedi: " + error.message);
        return;
      }
    }

    window.location.reload();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;

        const maxLength = 900_000;
        if (base64String.length > maxLength) {
          alert(
            "Fotoğrafınız çok büyük (maksimum yaklaşık 700 KB). Lütfen daha küçük bir resim seçin."
          );
          return;
        }

        setEditForm((prev) => ({
          ...prev,
          photoBase64: base64String,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Profil Bilgileri
      </h2>
      {userInfo ? (
        <div className="flex flex-col items-center space-y-6">
          <img
            src={
              userInfo.photoURL
                ? userInfo.photoURL
                : "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(userInfo.name || "Kullanıcı")
            }
            alt="Profil Fotoğrafı"
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="flex flex-col border border-gray-200 rounded p-4">
              <span className="text-gray-500 text-sm">İsim</span>
              <span className="text-lg font-medium text-gray-800">
                {userInfo.name || "Belirtilmemiş"}
              </span>
            </div>
            <div className="flex flex-col border border-gray-200 rounded p-4">
              <span className="text-gray-500 text-sm">E-posta</span>
              <span className="text-lg font-medium text-gray-800">
                {userInfo.email}
              </span>
            </div>
            <div className="flex flex-col border border-gray-200 rounded p-4">
              <span className="text-gray-500 text-sm">Rol</span>
              <span className="text-lg font-medium text-gray-800 capitalize">
                {userInfo.role}
              </span>
            </div>
            <div className="flex flex-col border border-gray-200 rounded p-4">
              <span className="text-gray-500 text-sm">Şifre</span>
              <span className="text-lg font-medium text-gray-800">
                ********
              </span>
            </div>
            <div className="flex flex-col border border-gray-200 rounded p-4">
              <span className="text-gray-500 text-sm">Kayıt Tarihi</span>
              <span className="text-lg font-medium text-gray-800">
                {userInfo.createdAt
                  ? userInfo.createdAt.toDate().toLocaleString()
                  : "Yok"}
              </span>
            </div>
            <div className="flex flex-col border border-gray-200 rounded p-4">
              <span className="text-gray-500 text-sm">Son Görülme</span>
              <span className="text-lg font-medium text-gray-800">
                {userInfo.lastSeen
                  ? userInfo.lastSeen.toDate().toLocaleString()
                  : "Yok"}
              </span>
            </div>
          </div>
                      <BlogBoxes />

          <button
            onClick={() => {
              setEditForm({
                name: userInfo.name || "",
                photoBase64: "",
                newPassword: "",
                currentPassword: "",
              });
              setIsEditOpen(true);
            }}
            className="inline-flex items-center mt-6 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium rounded transition"
          >
            Profil Düzenle
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">Yükleniyor...</p>
      )}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <h2 className="text-lg font-bold text-black text-center">
                Profil Düzenle
              </h2>
              <div>
                <label className="block text-sm text-gray-700 mb-1">İsim</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Profil Fotoğrafı
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm"
                />
                {editForm.photoBase64 && (
                  <img
                    src={editForm.photoBase64}
                    alt="Önizleme"
                    className="w-16 h-16 mt-2 rounded-full object-cover border"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  value={editForm.currentPassword}
                  onChange={(e) =>
                    setEditForm({ ...editForm, currentPassword: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                  placeholder="Şifre değiştirmek için zorunludur"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  value={editForm.newPassword}
                  onChange={(e) =>
                    setEditForm({ ...editForm, newPassword: e.target.value })
                  }
                  className="w-full border text-black rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Şifre değiştirmek istemiyorsanız boş bırakın"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded"
                  disabled={uploading}
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
