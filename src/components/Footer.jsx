import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-24 h-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">

        {/* Sol: Logo */}
        <div className="flex-shrink-0">
          <img
            src="/kodtepe.png" 
            alt="Kodtepe Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Orta: Sosyal Medya */}
        <div className="flex gap-6 text-2xl">
          {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
            <i className="fab fa-facebook-f"></i>
          </a> */}
          <a href="https://instagram.com/kodtepe" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
            <i className="fab fa-instagram"></i>
          </a>
          {/* <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
            <i className="fab fa-github"></i>
          </a> */}
          <a href="https://linkedin.com/company/kodtepe/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        {/* Sağ: Menü Linkleri */}
        <div className="flex flex-col items-center md:items-end gap-2 text-sm">
          
          <Link to="/contact" className="hover:text-yellow-400"><span className="text-lg font-semibold">Bize Ulaşın</span></Link>
          <Link to="/contact" className="hover:text-yellow-400">İletişim</Link>
          <Link to="/about" className="hover:text-yellow-400">Hakkımızda</Link>
          <Link to="/careers" className="hover:text-yellow-400">Kariyer</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
