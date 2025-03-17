import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const [menuAcik, setMenuAcik] = useState(false);

    return (
        <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
                <img src="/logo2.png" alt="Logo" className="h-16 w-auto" />
            </div>
            <button className="md:hidden" onClick={() => setMenuAcik(!menuAcik)}>
                {menuAcik ? "✖" : "☰"} 
            </button>
            <div className={`md:flex gap-6 text-lg ${menuAcik ? "block mt-4" : "hidden md:flex"}`}>
                {["/", "/contact", "/about", "/careers"].map((path, index) => (
                    <Link
                        key={index}
                        to={path}
                        className={`block md:inline-block text-white transition ${
                            location.pathname === path ? "text-yellow-400 font-bold" : "hover:text-yellow-400"
                        }`}
                    >
                        {path === "/" ? "Anasayfa" : path === "/contact" ? "İletişim" : path === "/about" ? "Hakkımızda" : "Kariyer"}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
