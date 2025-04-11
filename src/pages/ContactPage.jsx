import Footer from "../components/Footer";

const ContactPage = () => {
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Sorularınız Bizim İçin Bir <br /> Başlangıçtır
          </h1>
          <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Her büyük projenin bir ilk adımı vardır. İhtiyacınıza özel çözümler,
            hızlı geri dönüş ve güvenilir iş ortaklığı için bizimle tanışın.
          </p>
        </div>
      </section>

      <h2 className="text-4xl font-semibold mb-5 py-16 px-6 text-black text-center">
        İletişim
      </h2>

      {/* FORM ALANI */}
      <section className="bg-white w-full py-16 px-6 flex flex-col items-center">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            İletişim Formu
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
      </section>

      <section className="w-full px-6 py-16 bg-white flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-center">
  {/* Görsel ve Yazı */}
  <div className="relative flex justify-center items-center w-full lg:w-1/3">
    <img
      src="/konum.png" // Görselin yolu
      alt="Lokasyon"
      className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 transition-all duration-300" // Görsel boyutunu burada ayarlayabilirsiniz
    />
    {/* Yazının üzerine gelindiğinde harita görünsün */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
      <span className="text-xl font-semibold text-white bg-black bg-opacity-70 px-4 py-2 rounded-lg">
        Lokasyon Haritası
      </span>
    </div>
  </div>

  {/* Lokasyon Yazısı */}
  <div className="text-center lg:text-left lg:w-2/3">
    <h3 className="text-xl font-semibold mb-2">Lokasyonumuz</h3>
    <p className="text-gray-800">
      Teknopark Yerleşkesi, 17100 Sarıcaeli / Çanakkale Merkez / Çanakkale
    </p>
  </div>

  {/* Harita (Yazının üstüne gelindiğinde görünecek) */}
  <div className="w-full mt-4 lg:w-2/3 opacity-0 hover:opacity-100 transition-opacity duration-300">
    <iframe
      className="w-full h-64 rounded-lg"
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d762.6619057515364!2d26.4352481!3d40.1278557!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b1074232ad339d%3A0x135680859f268aeb!2s%C3%87anakkale%20Teknopark%20Teknoloji%20Geli%C5%9Ftirme%20B%C3%B6lgesi%20A.%C5%9E.!5e0!3m2!1str!2str!4v1741763202174!5m2!1str!2str"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</section>


      <Footer />
    </div>
  );
};

export default ContactPage;
