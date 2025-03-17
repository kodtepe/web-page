const CareersPage = () => {
  return (
    <div>
      <h1 className="p-4 text-3xl font-bold text-center text-white bg-black">
        Hakkımızda
      </h1>
    
    <div className="flex flex-row-400 h-auto m-6">
      <div className="w-full md:w-1/2  bg-white p-6 shadow-lg rounded-lg  ">
        <h2 className="text-2xl text-black font-bold text-black text-center">
          Başvuru Formu
        </h2>
        <form className="mt-4  text-black">
          <div className="mb-4 ">
            <input
              type="text"
              placeholder="Adınızı girin"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3c24f]"
            />
          </div>
          <div className="mb-4 ">
            <input
              type="text"
              placeholder="Soyadınızı girin"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3c24f]"
            />
          </div>
          <div className="mb-4 ">
            <input
              type="number"
              placeholder="Telefon Numaranızı girin"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3c24f]"
            />
          </div>
          <div className="mb-4 ">
            <input
              type="text"
              placeholder="Başvurmak istediğiniz alanı girin"
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
            <input
              type="url"
              placeholder="LinkedIn linkinizi girin"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e3c24f]"
            />
          </div>
          
          <div class="w-full max-w-md mx-auto text-center">
            <label
              for="fileInput"
              class="block px-4 py-2 border-2 border-dashed border-gray-300 text-[#9ca3af] rounded-md cursor-pointer hover:bg-[#e3c24f] hover:text-black hover:border-[#b0823b]"
            >
              Özgeçmişinizi Yükleyiniz
            </label>
            <input type="file" id="fileInput" class="hidden" />
            <p id="fileName" class="mt-2 text-sm text-gray-500">
              Henüz dosya seçilmedi.
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-[#b0823b] text-white p-2 rounded-lg transition hover:bg-[#e3c24f]"
          >
            Gönder
          </button>
        </form>
      </div>
      <div className=" w-1/2 h-auto m-4">
      <h1 className = "text-2xl text-black font-bold text-black text-center bg-white rounded-lg shadow-lg p-2">
        Aktif İlanlar
      </h1>
      <div className="m-4 w-1/2 flex-row justify-between ">
        <div className="bg-white p-4 rounded-lg shadow-md hover:bg-[#e3c24f]">
            <h2 className="text-xl font-semibold text-gray-800">Stajyer</h2>
            <p className="text-sm text-gray-600">Çalışma Şekli: Ofis</p>  </div>   
        </div>
      </div>
    </div>
    </div>
  );
};

export default CareersPage;
