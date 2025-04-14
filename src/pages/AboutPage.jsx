import { useEffect } from "react";
import Footer from "../components/Footer";

const AboutPage = () => {
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
          src="/hakkında.png"
          alt="Hakkımızda"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 text-white text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mont leading-tight animate-fade-in-up">
          Şimdi ve Geleceğe, <br /> Ar-Ge ve İnovasyonla
          </h1>
        </div>
      </section>

      {/* VİZYON & MİSYON BAŞLIKLARI + METİNLERİ */}
      <section className="w-full px-6 py-20 flex flex-col items-center">
        <div className="flex flex-col lg:flex-row justify-center items-start gap-12 max-w-6xl scroll-fade opacity-0 translate-y-10 transition-all duration-700 ease-in-out">

          {/* Vizyon */}
          <div className="w-full lg:w-1/2 text-center">
            <h2 className="text-4xl font-mont font-bold italic text-black mb-11">Vizyonumuz</h2>
            <p className="text-gray-800 max-w-md mx-auto leading-relaxed font-mulish italic text-sm">
              Kodtepe olarak vizyonumuz; bireysel girişimlerden büyük ölçekli kurumlara kadar tüm
              paydaşlarımıza, yazılımın gücüyle değer katan, yenilikçi ve kullanıcı odaklı çözümler
              sunarak dijital dönüşümün öncüsü olmaktır.
            </p>
          </div>

          {/* Misyon */}
          <div className="w-full lg:w-1/2 text-center">
            <h2 className="text-4xl font-mont font-bold italic text-black mb-11">Misyonumuz</h2>
            <p className="text-gray-800 max-w-md mx-auto font-mulish italic leading-relaxed text-sm">
              Misyonumuz; bireysel ve kurumsal ihtiyaçlara özel web ve mobil çözümler geliştirerek,
              müşterilerimizin iş hedeflerine ulaşmasını sağlamak, teknolojiyi işlevsellikle
              buluşturmak ve iş ortaklarımıza güvenilir bir dijital yol arkadaşı olmaktır.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
