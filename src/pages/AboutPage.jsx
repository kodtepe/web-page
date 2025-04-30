import { useState, useEffect } from "react";
import { FaMapMarkedAlt, FaBullseye, FaKey } from "react-icons/fa";
import Footer from "../components/Footer";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("hikayemiz");
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setImageLoaded(false); // her tab değişince sıfırla
  }, [activeTab]);

  const renderContent = () => {
    if (activeTab === "hikayemiz") {
      return (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl font-mont font-bold italic mb-5 py-16 px-6 text-black text-center animate-fade-in-up">
            Hikayemiz
          </h2>
          <div className="relative flex items-center justify-center w-full max-w-[1600px]">
            {!imageLoaded && (
              <div className="absolute w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            )}
            <img
              src={isMobile ? "/roadmap2.png" : "/roadmap1.png"}
              alt="Roadmap"
              onLoad={() => setImageLoaded(true)}
              className={`h-auto object-contain transform transition-all duration-700 ease-out ${
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            />
          </div>
        </div>
      );
    } else if (activeTab === "vizyonmisyon") {
      return (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl font-mont font-bold italic mb-5 py-16 px-6 text-black text-center animate-fade-in-up">
            Vizyon ve Misyonumuz
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {isMobile ? (
              ["vizyon.png", "misyon.png"].map((src, idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  <div className="relative flex items-center justify-center w-64 h-64">
                    {!imageLoaded && (
                      <div className="absolute w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    <img
                      src={`/${src}`}
                      alt={src.includes("vizyon") ? "Vizyon" : "Misyon"}
                      onLoad={() => setImageLoaded(true)}
                      className={`w-64 h-auto opacity-80 transform transition-all duration-700 ease-out ${
                        imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}
                    />
                  </div>
                  <p className="absolute inset-0 flex items-center justify-center text-white text-center text-sm italic p-2">
                    {src.includes("vizyon")
                      ? "Lorem ipsum dolor sit amet, Vizyon yazısı burada olacak."
                      : "Lorem ipsum dolor sit amet, Misyon yazısı burada olacak."}
                  </p>
                </div>
              ))
            ) : (
              <div className="relative flex items-center justify-center w-full max-w-[1600px]">
                {!imageLoaded && (
                  <div className="absolute w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                )}
                <img
                  src="/mount.png"
                  alt="Mount"
                  onLoad={() => setImageLoaded(true)}
                  className={`h-auto object-contain transform transition-all duration-700 ease-out ${
                    imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      );
    } else if (activeTab === "kulturumuz") {
      return (
        <div className="w-full flex flex-col items-center">
          <h2 className="text-4xl font-mont font-bold italic mb-5 py-16 px-6 text-black text-center animate-fade-in-up">
            Kültürümüz
          </h2>
          <div className="mt-8 text-center max-w-xl mx-auto">
            <p className="text-gray-800 text-lg md:text-xl italic leading-relaxed">
              Kodtepe olarak birlikte öğrenmeye, gelişime ve açık iletişime değer veriyoruz. Her fikirin kıymetli
              olduğu, iş birliğinin ön planda tutulduğu bir çalışma ortamı oluşturmayı amaçlıyoruz. Yenilikçi çözümler
              üretirken eğlenmeyi, paylaşmayı ve sürekli gelişmeyi önemsiyoruz.
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <img src="/hakkında.png" alt="Hakkımızda" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 text-white text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mont leading-tight animate-fade-in-up">
            Şimdi ve Geleceğe, <br /> Ar-Ge ve İnovasyonla
          </h1>
        </div>
      </section>

      {/* Tabs Frame Section */}
      <section className="w-full flex justify-center py-8 bg-black">
        <div className="flex justify-center flex-wrap gap-8">
          {[
            { tab: "hikayemiz", icon: <FaMapMarkedAlt />, label: "Hikayemiz" },
            { tab: "vizyonmisyon", icon: <FaBullseye />, label: "Vizyon ve Misyonumuz" },
            { tab: "kulturumuz", icon: <FaKey />, label: "Kültürümüz" },
          ].map(({ tab, icon, label }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all transform hover:scale-105 active:scale-95 duration-300 ${
                activeTab === tab ? "bg-yellow-400 text-black" : "bg-black text-white"
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="w-full px-6 py-12 flex flex-col items-center">
        <div className="w-full flex justify-center">{renderContent()}</div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
