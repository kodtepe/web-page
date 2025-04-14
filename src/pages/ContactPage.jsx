import { useEffect } from "react";
import Footer from "../components/Footer";

const ContactPage = () => {
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
    <div className="flex flex-col bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src="/iletişim.png"
          alt="İletişim"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 text-white text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mont leading-tight animate-fade-in-up">
          Her Mesaj, Bizim İçin Değerli.
          </h1>
          <p className="mt-4 text-base font-inter text-gray-400 leading-relaxed sm:text-lg max-w-2xl mx-auto">
          Sorularınızı ve önerilerinizi bizimle paylaşın. Sizi dinlemek ve en uygun çözümleri sunmak için buradayız.
          </p>
        </div>
      </section>

      {/* BAŞLIK */}
      <h2 className="text-4xl font-mont font-bold italic mb-5 py-16 px-6 text-black text-center animate-fade-in-up">
        İletişim
      </h2>

      {/* FORM ve HARİTA BLOĞU (scroll-fade animasyonlu) */}
      <section className="w-full px-6 py-16 bg-white flex flex-col lg:flex-row lg:gap-16 gap-20 max-w-6xl mx-auto items-start transition-all duration-700 ease-in-out opacity-0 translate-y-10 scroll-fade">
        {/* FORM */}
        <div className="w-full lg:w-1/2">
          <div className="w-full bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-black">
              Bize Ulaşın
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Adınız ve Soyadınız"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <textarea
                placeholder="Size nasıl yardımcı olabiliriz?"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500 transition"
              >
                Gönder
              </button>
            </form>
          </div>
        </div>

        {/* HARİTA + ADRES */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="flex flex-col items-center gap-6 w-full">
            {/* HARİTA */}
            <div className="w-full sm:w-[500px] h-[250px] md:w-[600px] md:h-[300px]">
              <iframe
                className="w-full h-full rounded-lg border"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d762.6619057515364!2d26.4352481!3d40.1278557!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b1074232ad339d%3A0x135680859f268aeb!2s%C3%87anakkale%20Teknopark%20Teknoloji%20Geli%C5%9Ftirme%20B%C3%B6lgesi%20A.%C5%9E.!5e0!3m2!1str!2str!4v1741763202174!5m2!1str!2str"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* ADRES */}
            <div className="text-center md:text-left px-4">
              <p className="text-gray-400 font-medium max-w-md leading-relaxed">
                Teknopark Yerleşkesi <br />
                17100 Sarıcaeli, Çanakkale Merkez <br />
                Çanakkale / Türkiye
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ContactPage;
