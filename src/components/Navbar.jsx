import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [menuAcik, setMenuAcik] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/logo2.png" alt="Kodtepe Logo" className="h-12 w-auto" />
      </div>
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuAcik(!menuAcik)}
      >
        {menuAcik ? "✖" : "☰"}
      </button>
      <div
        className={`${
          menuAcik ? "block" : "hidden"
        } md:flex md:gap-8 text-lg mt-4 md:mt-0`}
      >
        {[
          { path: "/", label: "Anasayfa" },
          { path: "/contact", label: "İletişim" },
          { path: "/about", label: "Hakkımızda" },
          { path: "/careers", label: "Kariyer" },
        ].map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`block md:inline-block transition ${
              location.pathname === path
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-400"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
