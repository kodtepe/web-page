import { db } from "./firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export const updateAdminsCollection = async () => {
  const adminsRef = collection(db, "admins");
  const snapshot = await getDocs(adminsRef);

  if (snapshot.empty) {
    console.log("Hiç admin belgesi bulunamadı.");
    return;
  }

  const updates = snapshot.docs.map(async (adminDoc) => {
    const data = adminDoc.data();
    const adminRef = doc(db, "admins", adminDoc.id);

    const updatedFields = {
      name: data.name || "Admin Kullanıcı",
      email: data.email || adminDoc.id,
      role: data.role || "admin",
      createdAt: data.createdAt || new Date(),
      lastSeen: new Date(),
      photoURL: data.photoURL || "",
    };

    console.log(`Güncelleniyor: ${adminDoc.id}`);
    await updateDoc(adminRef, updatedFields);
  });

  await Promise.all(updates);

  console.log("Tüm admin belgeleri güncellendi.");
};
