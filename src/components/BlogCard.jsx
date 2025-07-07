import { useState } from "react";

const BlogCard = ({ title, content }) => {
  return (
    <div
      className="relative cursor-pointer group rounded-xl overflow-hidden shadow hover:shadow-2xl transition duration-300 bg-gradient-to-br from-yellow-300 to-yellow-100 h-72 flex flex-col justify-end p-6"
    >
      <h3 className="text-black text-xl font-bold mb-2 font-mont group-hover:text-black transition">
        {title}
      </h3>
      <p className="text-gray-800 text-sm mb-4 font-inter line-clamp-3 group-hover:text-black transition">
        {content?.slice(0, 100)}...
      </p>
      <div className="flex justify-center">
        <span
          className="inline-block text-sm font-medium text-black bg-white bg-opacity-80 px-4 py-2 rounded-full group-hover:bg-opacity-100 transition"
        >
          Daha fazla oku
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
