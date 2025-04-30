import { useState, useEffect } from "react";

const CareerSection = () => {
  const [openId, setOpenId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roles = [
    {
      id: "stajyer",
      title: "Stajyer",
      shortDescription:
        "Kodtepe, yazılım alanında kariyerine yön vermek isteyen yetenekli stajyer adaylarını ekibine katmaya hazırlanıyor.",
      longDescription:
        "Stajyer için uzun açıklama alanı. Yazılım geliştirme süreçlerine katkıda bulunacak, ekip çalışmasına uyum sağlayacak, yeni teknolojileri öğrenmeye açık takım arkadaşları arıyoruz.",
    },
    {
      id: "backend",
      title: "Backend Developer",
      shortDescription:
        "Kodtepe olarak; ölçeklenebilir, güvenli ve performans odaklı sistemler geliştirecek, backend süreçlerine hâkim takım arkadaşları arıyoruz.",
      longDescription:
        "Backend Developer için uzun açıklama. Node.js, MongoDB gibi teknolojilere hakim, ölçeklenebilir ve güvenli sistemler kurabilecek yazılımcılar arıyoruz.",
    },
    {
      id: "icerik",
      title: "Sosyal Medya İçerik Üreticisi",
      shortDescription:
        "Marka kimliğimizi dijitalde etkili biçimde yansıtacak, yaratıcı ve stratejik içerikler üretecek sosyal medya içerik üreticisi arıyoruz.",
      longDescription:
        "İçerik üreticisi için açıklama. Marka dili ile uyumlu yaratıcı içerikler üretecek, sosyal medya kampanyalarını yönetecek kişiler arıyoruz.",
    },
  ];

  const toggleDetails = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    <div className="flex flex-col bg-white font-mulish">
      {/* Başlık */}
      <h2 className="text-4xl font-mont font-bold italic mb-5 py-16 px-6 text-black text-center scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-in-out">
        Açık Pozisyonlar
      </h2>

      {/* Kartlar */}
      <section className="w-full px-6 py-16 bg-white max-w-6xl mx-auto space-y-6 scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-in-out">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`rounded-lg p-6 transition-all duration-300 ${
              openId === role.id ? "bg-[#F5DC96]" : "bg-[#F4D16A]"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-black">{role.title}</h2>
                <p className="text-black text-base font-inter">{role.shortDescription}</p>
              </div>
              <button
                onClick={() => toggleDetails(role.id)}
                className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition"
              >
                {openId === role.id ? "Gizle" : "Detay"}
              </button>
            </div>

            {/* Detay */}
            {openId === role.id && (
              <div className="mt-4 transition-all duration-500 ease-in-out">
                <p className="text-black mb-4 text-base font-inter">{role.longDescription}</p>
                <button
                  onClick={openModal}
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
            <h2 className="text-2xl font-mont font-bold text-black text-center mb-4">
              CV Bırakma Formu
            </h2>
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-black">
              ✖
            </button>
            <form className="flex flex-col space-y-3 text-black">
              <input type="text" placeholder="Adınız" required className="border p-2 rounded" />
              <input type="text" placeholder="Soyadınız" required className="border p-2 rounded" />
              <input type="email" placeholder="E-mail Adresiniz" required className="border p-2 rounded" />
              <input type="tel" placeholder="Telefon Numaranız" required pattern="[0-9]*" className="border p-2 rounded" />
              <input type="file" required className="border p-2 rounded" />
              <textarea placeholder="Size nasıl yardımcı olabiliriz?" className="border p-2 rounded" />
              <button type="submit" className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                Başvur
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerSection;
