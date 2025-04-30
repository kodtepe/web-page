import { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "../components/Footer";

const CareersPage = () => {
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

  // İlanları Firestore'dan çek
  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobList(jobs);
    };
    fetchJobs();
  }, []);

  // Scroll animasyonları
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".scroll-fade");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col bg-white min-h-screen font-mulish">
      {/* HERO */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <img src="/kariyer.png" alt="Kariyer" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 text-white text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mont leading-tight animate-fade-in-up">
            Kariyerini Kodtepe’yle Planla
          </h1>
          <p className="mt-4 text-base font-inter leading-relaxed text-gray-400 sm:text-lg max-w-2xl mx-auto animate-fade-in-up">
            Kodtepe’nin kültürünü tanıman ve birlikte geliştirmemiz için seni ekip arkadaşımız olarak görmekten mutluluk
            duyarız.
          </p>
        </div>
      </section>

      {/* Açık Pozisyonlar */}
      <h2 className="text-4xl font-mont font-bold italic mb-5 py-16 px-6 text-black text-center scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-in-out">
        Açık Pozisyonlar
      </h2>

      <section className="w-full px-6 py-16 bg-white max-w-6xl mx-auto space-y-6 scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-in-out">
        {jobList.map((role) => (
          <div
            key={role.id}
            className={`rounded-lg p-6 transition-all duration-300 ${
              openId === role.id ? "bg-[#F5DC96]" : "bg-[#F4D16A]"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-black">{role.position}</h2>
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
              <div className="mt-4 transition-all duration-500 ease-in-out">
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
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <h2 className="text-2xl font-mont font-bold text-black text-center mb-6">CV Bırakma Formu</h2>
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-black">
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
              <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                Başvur
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CareersPage;
