import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const CareerSection = () => {
  const [jobList, setJobList] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
    position: "",
  });

  const navigate = useNavigate();

  const toggleDetails = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const openModal = (position) => {
    setFormData((prev) => ({ ...prev, position }));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      surname: "",
      email: "",
      phone: "",
      message: "",
      position: "",
    });
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "applications"), formData);
      setSuccessMessage("Başvurunuz başarıyla gönderildi!");
      setFormData({
        name: "",
        surname: "",
        email: "",
        phone: "",
        message: "",
        position: "",
      });
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Başvuru kaydedilemedi:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobList(jobs.slice(0, 3)); // sadece ilk 3 ilan
    };
    fetchJobs();
  }, []);

  return (
    <section className="w-full px-6 py-16 bg-gray-100 font-mulish">
      <h2 className="text-3xl font-bold font-mont italic mb-10 text-center text-black">
        Ekibimize Katıl
      </h2>

      <div className="max-w-6xl mx-auto space-y-6">
        {jobList.map((role) => (
          <div
            key={role.id}
            className={`rounded-lg p-6 transition-all duration-300 ${
              openId === role.id ? "bg-[#F5DC96]" : "bg-[#F4D16A]"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-black">{role.position}</h3>
                <p className="text-black text-base font-inter">{role.short}</p>
              </div>
              <button
                onClick={() => toggleDetails(role.id)}
                className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition"
              >
                {openId === role.id ? "Gizle" : "Detay"}
              </button>
            </div>

            {openId === role.id && (
              <div className="mt-4">
                <p className="text-black mb-4 text-base font-inter">{role.detail}</p>
                <button
                  onClick={() => openModal(role.position)}
                  className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
                >
                  Başvur
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/careers")}
          className="bg-[#F4D16A] text-black font-bold px-6 py-2 rounded hover:bg-[#F5DC96] transition"
        >
          Tüm İlanları Gör
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-2xl font-mont font-bold text-black text-center mb-6">
              CV Bırakma Formu
            </h2>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center font-medium shadow transition-all duration-300">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col space-y-3 text-black">
              <input
                type="text"
                name="name"
                placeholder="Adınız"
                value={formData.name}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="surname"
                placeholder="Soyadınız"
                value={formData.surname}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail Adresiniz"
                value={formData.email}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefon Numaranız"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <textarea
                name="message"
                placeholder="Kendinizi kısaca tanıtın."
                value={formData.message}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              >
                Başvur
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CareerSection;
