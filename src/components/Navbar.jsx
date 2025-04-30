import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [menuAcik, setMenuAcik] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between relative shadow-md z-50">
      
      {/* Logo (tıklanınca anasayfaya gider) */}
      <Link to="/" onClick={() => setMenuAcik(false)} className="flex items-center">
        <img src="/logo2.png" alt="Kodtepe Logo" className="h-12 w-auto cursor-pointer" />
      </Link>

      {/* Hamburger Butonu */}
      <button
        className="md:hidden text-white focus:outline-none z-50"
        onClick={() => setMenuAcik(!menuAcik)}
        aria-label="Menüyü Aç / Kapat"
      >
        {menuAcik ? (
          <X className="w-8 h-8 transition-transform duration-300 ease-in-out rotate-180" />
        ) : (
          <Menu className="w-8 h-8 transition-transform duration-300 ease-in-out" />
        )}
      </button>

      {/* Menü Linkleri */}
      <div
        className={`
          ${
            menuAcik
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }
          absolute top-20 left-0 w-full bg-black text-white flex flex-col items-center gap-6 p-6 
          transition-all duration-500 ease-in-out 
          md:static md:flex md:flex-row md:justify-end md:items-center md:gap-8 md:opacity-100 md:translate-y-0 md:pointer-events-auto md:bg-transparent md:p-0
        `}
      >
        {[
          { path: "/", label: "Anasayfa" },
          { path: "/blog", label: "Bloglarımız" },
          { path: "/about", label: "Hakkımızda" },
          { path: "/careers", label: "Kariyer" },
          { path: "/contact", label: "İletişim" },

        ].map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`text-lg font-medium transition-all duration-300 ${
              location.pathname === path
                ? "text-yellow-400"
                : "hover:text-yellow-400"
            }`}
            onClick={() => setMenuAcik(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
