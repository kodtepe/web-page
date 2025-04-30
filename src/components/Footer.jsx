import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsModalOpen(false);
      setEmail("");
      setPassword("");
      navigate("/admin");
    } catch (error) {
      alert("Giriş başarısız! Bilgilerinizi kontrol edin.");
      console.error("Giriş hatası:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <footer className="bg-black text-white px-6 py-16 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
          {/* Sol: Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => (user ? navigate("/admin") : setIsModalOpen(true))}
          >
            <img
              src="/kodtepe.png"
              alt="Kodtepe Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Orta: Sosyal Medya */}
          <div className="flex gap-6 text-2xl items-center">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>

          {/* Sağ: Menü Linkleri */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm">
            <span className="text-lg font-semibold">Bize Ulaşın</span>
            <Link to="/contact" className="hover:text-yellow-400">
              İletişim
            </Link>
            <Link to="/about" className="hover:text-yellow-400">
              Hakkımızda
            </Link>
            <Link to="/careers" className="hover:text-yellow-400">
              Kariyer
            </Link>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4 transition-all duration-300 ease-in-out">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-center mb-6 text-black font-mont">
              Yönetici Girişi
            </h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="E-posta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                required
              />
              <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-black font-bold py-2 rounded-md"
              >
                Giriş Yap
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Bilgisi – Kayan Mini Bar */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 animate-slideUp bg-black bg-opacity-80 backdrop-blur-md border-t border-yellow-400 text-white px-4 py-3 flex flex-col sm:flex-row justify-between items-center z-50 text-sm md:text-base gap-2 sm:gap-0">
          <p className="text-yellow-300 truncate max-w-full sm:max-w-[50%]">
            Giriş yapan: <span className="text-white">{user.email}</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <Link
              to="/admin"
              className="text-green-400 hover:text-green-300 underline text-xs sm:text-sm"
            >
              Admin Paneli
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 underline text-xs sm:text-sm"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
