import { useState } from "react";

const BlogCard = ({ title }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div
      onClick={handleClick}
      className="relative group bg-gradient-to-br from-yellow-100 to-white h-48 rounded-xl shadow-md flex items-end justify-center p-4 overflow-hidden cursor-pointer transition duration-300 hover:shadow-xl"
    >
      {/* Hover'da çıkan 'Daha Fazla' etiketi */}
      {!clicked && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out z-20">
          <span className="text-base font-semibold font-inter text-white bg-black bg-opacity-70 px-4 py-2 rounded-lg shadow-sm">
            Daha fazla
          </span>
        </div>
      )}

      {/* Blog başlığı */}
      <span className="relative z-10 text-center font-mont text-lg text-gray-700 font-semibold group-hover:opacity-60 group-hover:-translate-y-1 transition duration-300">
        {title}
      </span>
    </div>
  );
};

export default BlogCard;
