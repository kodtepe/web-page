import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("admin"); // Modal sekmesi
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Firestore'dan gelen rol
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Firestore'dan admin kontrolü
        const adminDocRef = doc(db, "admins", currentUser.email);
        const adminDocSnap = await getDoc(adminDocRef);

        if (adminDocSnap.exists()) {
          setRole("admin");
        } else {
          // Üye kontrolü
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRole(docSnap.data().role || "member");
          } else {
            setRole(null);
          }
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedUser = userCredential.user;

      if (activeTab === "admin") {
        // Admin kontrolü Firestore'dan
        const adminDocRef = doc(db, "admins", loggedUser.email);
        const adminDocSnap = await getDoc(adminDocRef);

        if (!adminDocSnap.exists()) {
          await signOut(auth);
          alert("Bu hesaba yönetici yetkisi atanmadığı için yönetici girişi yapılamaz.");
          return;
        }

        // Yönetici girişi başarılı
        setRole("admin");
        setIsModalOpen(false);
        setEmail("");
        setPassword("");
        navigate("/admin");
        return;
      }

      if (activeTab === "member") {
        const docRef = doc(db, "users", loggedUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userRole = (docSnap.data().role || "member").toLowerCase();

          if (userRole !== "member") {
            await signOut(auth);
            alert("Bu hesaba üye yetkisi atanmadığı için üye girişi yapılamaz.");
            return;
          }

          // Üye girişi başarılı
          setRole("member");
          setIsModalOpen(false);
          setEmail("");
          setPassword("");
          navigate("/member");
        } else {
          await signOut(auth);
          alert("Bu kullanıcı için bir rol bilgisi bulunamadı. Lütfen yöneticinizle iletişime geçin.");
        }
      }
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
            onClick={() => setIsModalOpen(true)}
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
              href="https://www.instagram.com/kodtepe/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/kodtepe/"
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
            {/* Tab Seçici */}
            <div className="flex mb-6">
              <button
                onClick={() => setActiveTab("admin")}
                className={`flex-1 py-2 font-bold rounded-l ${
                  activeTab === "admin"
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Yönetici Girişi
              </button>
              <button
                onClick={() => setActiveTab("member")}
                className={`flex-1 py-2 font-bold rounded-r ${
                  activeTab === "member"
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Üye Girişi
              </button>
            </div>

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

      {/* Giriş Bilgisi */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 animate-slideUp bg-black bg-opacity-80 backdrop-blur-md border-t border-yellow-400 text-white px-4 py-3 flex flex-col sm:flex-row justify-between items-center z-50 text-sm md:text-base gap-2 sm:gap-0">
          <p className="text-yellow-300 truncate max-w-full sm:max-w-[50%]">
            Giriş yapan: <span className="text-white">{user.email}</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            {role === "admin" && (
              <Link
                to="/admin"
                className="text-green-400 hover:text-green-300 underline text-xs sm:text-sm"
              >
                Admin Paneli
              </Link>
            )}
            {role === "member" && (
              <Link
                to="/member"
                className="text-green-400 hover:text-green-300 underline text-xs sm:text-sm"
              >
                Üye Paneli
              </Link>
            )}
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
