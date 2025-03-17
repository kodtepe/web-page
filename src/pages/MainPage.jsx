//importlar buraya yazılır

const MainPage = () => {
  //Fonk buraya yazılır

  return (
  <div className="flex flex-col">
    <h1 className="p-4 text-2xl sm:text-3xl font-bold text-center text-white bg-black">
      Kodtepe - Yenilikçi Yazılım Çözümleri
    </h1>
    <div className="relative w-full h-screen flex justify-center items-center lg:h-[50vh]">
      <img className="absolute top-0 left-0 w-full h-full object-cover lg:h-[50vh]" src="/coding3.jpg" alt="Kodlama" />
      <div className="absolute inset-0  w-full h-full bg-black opacity-30"></div>
      <h1 className="absolute max-w-xs sm:max-w-md md:max-w-xl p-4 text-2xl sm:text-3xl md:text-6xl text-left text-white z-10 break-words">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam vel aperiam perspiciatis facilis reiciendis.
      </h1>
    </div>
  </div>
);

  
};
export default MainPage;
