import { useState } from "react";

const BlogCard = ({ title }) => {
  const [clicked, setClicked] = useState(false); // Tıklanınca kontrol eder

  const handleClick = () => {
    setClicked(true); // Bir kere tıklanınca "Daha fazla" yazısı gizlenecek
  };

  return (
    <div
      onClick={handleClick}
      className="relative group bg-gray-200 h-48 rounded-lg shadow-md flex items-end justify-center p-4 text-black text-base font-medium overflow-hidden transition duration-300 hover:bg-opacity-80 hover:shadow-lg cursor-pointer"
    >
      {/* Hover'da gözükecek, tıklanınca kaybolacak */}
      {!clicked && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out z-20">
          <span className="text-xl font-semibold text-white bg-black bg-opacity-70 px-4 py-2 rounded-lg">
            Daha fazla
          </span>
        </div>
      )}

      {/* Her zaman gözükecek başlık */}
      <span className="relative z-10 group-hover:opacity-60 transition text-center">
        {title}
      </span>
    </div>
  );
};

export default BlogCard;
