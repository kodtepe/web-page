import React, { useState } from "react";
import { updateAdminsCollection } from "../updateAdminsCollection";

const AdminMigration = () => {
  const [status, setStatus] = useState("");

  const handleUpdate = async () => {
    setStatus("Güncelleniyor...");
    await updateAdminsCollection();
    setStatus("Tüm admin verileri başarıyla güncellendi!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4 text-black">Admin Verilerini Güncelle</h1>
      <button
        onClick={handleUpdate}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded"
      >
        Güncelle
      </button>
      {status && <p className="mt-4 text-black">{status}</p>}
    </div>
  );
};

export default AdminMigration;
