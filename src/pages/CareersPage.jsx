import { useState, useEffect } from "react";
import Footer from "../components/Footer";

const CareersPage = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const roles = [
    {
      id: "backend",
      title: "Backend Developer Stajyeri",
      details: `Gelişim ekibimizle kodlarda, backend teknolojilerinde iş almayı ve kendini bu alanda geliştirmek isteyen Stajyer Backend Developer arıyoruz.

• Temel seviyede yazılım geliştirme hakkında bilgi
• Herhangi bir backend diline giriş yapmış olması (Node.js tercih sebebi)
• Temel düzeyde veritabanı bilgisi (MongoDB, MySQL)
• Git versiyon kontrol bilgisi
• Sorumluluk sahibi, problem çözme odaklı

Lokasyon: Çanakkale Teknopark
Çalışma Süresi: Minimum 3 ay`,
    },
    {
      id: "frontend",
      title: "Frontend Developer Stajyeri",
      details: `Kullanıcı arayüzü tasarımı konusunda kendini geliştirmek isteyen, React.js ile projelerde yer almak isteyen Frontend stajyeri arıyoruz.

• HTML, CSS, JavaScript bilgisi
• React veya benzeri frameworklere ilgi
• Responsive tasarım anlayışı
• Git bilgisi

Lokasyon: Çanakkale Teknopark
Çalışma Süresi: Minimum 3 ay`,
    },
  ];

  const selected = roles.find((r) => r.id === selectedRole);

  return (
    <div className="flex flex-col bg-white min-h-screen font-mulish">
      {/* HERO */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src="/kariyer.png"
          alt="Kariyer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 text-white text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mont leading-tight animate-fade-in-up">
            Yazılımın Zirvesi Seni Bekliyor
          </h1>
          <p className="mt-4 text-base font-inter leading-relaxed text-gray-400 sm:text-lg max-w-2xl mx-auto animate-fade-in-up">
            Kodtepe, teknolojiyi işlevsellik ile buluşturan güçlü bir ekip
            arkadaşıyla büyümeye devam ediyor.
          </p>
        </div>
      </section>

      {/* POZİSYON SEÇİMİ & DETAY */}
      <section className="w-full px-6 py-16 bg-white flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Sol: Pozisyon Seçici (1/3) */}
        <div className="w-full lg:w-1/3">

          <select
            id="position"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full bg-white text-black border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Pozisyon Seçiniz</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>
        </div>

        {/* Sağ: Açıklama Kutusu (2/3) */}
        <div className="w-full lg:w-2/3 bg-white border border-gray-200 rounded-lg shadow-md p-6 animate-fade-in-up">
          {selected ? (
            <>
              <h2 className="text-xl font-bold mb-4 text-black">
                {selected.title}
              </h2>
              <p className="whitespace-pre-line text-gray-700">
                {selected.details}
              </p>
            </>
          ) : (
            <p className="text-gray-600 italic">
              Açık pozisyonları görüntülemek için lütfen filtreleme yapınız.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;
