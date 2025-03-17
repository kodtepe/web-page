const ContactPage = () => {
  return (
    <div>
      <h1 className="p-4 text-3xl font-bold text-center text-white bg-black">
        İletişim
      </h1>
      <div className="relative w-screen h-[520px] overflow-hidden flex justify-center items-center">
        <img
          className="w-full h-auto object-cover inset-0 bg-black opacity-80"
          src="/contact3.jpg"
          alt="Contact"
        />
      </div>
      <div className="bg-[#b0823b] flex flex-col xl:flex-row justify-center items-center gap-10 p-10">
        <div className=" flex justify-center w-full xl:w-1/2 h-auto p-6">
          <div className="w-full xl:w-1/2  bg-white p-6 shadow-lg rounded-lg  ">
            <h2 className="text-2xl text-black font-bold text-black text-center">
              İletişim
            </h2>

            <form className="mt-4  text-black">
              <div className="mb-4 ">
                <input
                  type="text"
                  placeholder="Adınızı girin"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3c24f]"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="E-posta adresinizi girin"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3c24f]"
                />
              </div>
              <div className="mb-4">
                <textarea
                  rows="4"
                  placeholder="Mesajınızı yazın..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3c24f]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#b0823b] text-white p-2 rounded-lg transition hover:bg-[#e3c24f]"
              >
                Gönder
              </button>
            </form>
          </div>
        </div>
        <div className="w-full xl:w-1/2 h-auto bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-black text-center">Adres</h2>
          <div>
            <iframe
              className="w-full h-[300px] mt-4 rounded-lg overflow-hidden relative"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d762.6619057515364!2d26.4352481!3d40.1278557!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b1074232ad339d%3A0x135680859f268aeb!2s%C3%87anakkale%20Teknopark%20Teknoloji%20Geli%C5%9Ftirme%20B%C3%B6lgesi%20A.%C5%9E.!5e0!3m2!1str!2str!4v1741763202174!5m2!1str!2str"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div>
            <p className="className=mt-4 p-4 text-gray-800 rounded-lg relative z-10 text-xl text-center">
              {" "}
              Teknopark Yerleşkesi, 17100 Sarıcaeli/Çanakkale Merkez/Çanakkale
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;
