import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="flex flex-col bg-white">

      {/* HERO SECTION */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src="/hakkında.png" // Figma'daki görselini buraya koy
          alt="Hakkımızda"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 text-white text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Kod Bizim Dilimiz, <br className="sm:hidden" /> Çözüm Sizin Hikayeniz
          </h1>
        </div>
      </section>

      {/* VİZYON & MİSYON */}
      <section className="w-full py-20 px-6 bg-white flex flex-col gap-10 items-center">
        {/* Vizyon */}
        <div className="w-full max-w-3xl text-center border border-gray-200 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-black mb-3">Vizyonumuz</h2>
          <p className="text-gray-700">
            Kodtepe olarak vizyonumuz; bireysel girişimlerden büyük ölçekli kurumlara kadar tüm
            paydaşlarımıza, yazılımın güçlü ve değer katan, yenilikçi ve kullanıcı odaklı çözümler
            sunarak dijital dönüşümün öncüsü olmaktır.
          </p>
        </div>

        {/* Misyon */}
        <div className="w-full max-w-3xl text-center border border-gray-200 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-black mb-3">Misyonumuz</h2>
          <p className="text-gray-700">
            Misyonumuz; bireysel ve kurumsal ihtiyaçlara özel web ve mobil çözümler geliştirerek,
            müşterilerimizin iş hedeflerine ulaşmasını sağlamak. Teknolojiyi işlevsellik buluşturmak
            ve iş ortaklarımıza güvenilir bir dijital yol arkadaşı olmaktır.
          </p>
        </div>
      </section>
      <Footer />

    </div>
  );
};

export default AboutPage;
