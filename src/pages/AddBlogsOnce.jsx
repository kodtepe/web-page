// src/pages/AddBlogsOnce.jsx
import { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const AddBlogsOnce = () => {
  useEffect(() => {
    const addBlogs = async () => {
      const blogsRef = collection(db, "blogs");

      const dummyBlogs = [
        {
          title: "Yazılım dünyasına ilk adım",
          summary: `Yazılım öğrenmeye başlamak, ilk başta göz korkutucu görünebilir. Ancak doğru yöntem ve kaynaklarla bu süreç oldukça keyifli ve öğretici hale gelir. Bu yazıda, yazılım dünyasına atılmak isteyenler için temel konulara odaklanıyoruz. Değişkenler, döngüler, koşullar, fonksiyonlar gibi yapı taşlarını örneklerle anlatıyor; algoritma mantığını basit uygulamalarla kavratıyoruz. Ayrıca yeni başlayanlar için ideal diller (Python, JavaScript), pratik yapabileceğiniz platformlar ve kaynaklar da bu rehberde yer alıyor. Hedefimiz, sıfırdan başlayan birinin yazılım dünyasında kendine sağlam bir temel oluşturmasını sağlamak.`,
          slug: "yazilima-giris"
        },
        {
          title: "Frontend teknolojilerine genel bakış",
          summary: `Frontend geliştirme, bir web sitesinin ya da uygulamanın kullanıcıya görünen yüzüdür. Bu yazıda HTML ile sayfa yapısını kurmayı, CSS ile stil vermeyi, JavaScript ile interaktif özellikler eklemeyi detaylıca anlatıyoruz. Ayrıca React, Vue gibi modern framework'lerin mantığını, component (bileşen) yapısını ve SPA (tek sayfa uygulama) geliştirme felsefesini örneklerle açıklıyoruz. Responsive tasarım, erişilebilirlik, SEO uyumu gibi konular da kullanıcı odaklı tasarımın ayrılmaz parçalarıdır. Eğer kullanıcı dostu, estetik ve hızlı çalışan arayüzler geliştirmek istiyorsan bu yazı tam sana göre.`,
          slug: "frontend-genel-bakis"
        },
        {
          title: "Backend nedir ve neden önemlidir?",
          summary: `Backend, bir uygulamanın ya da web sitesinin görünmeyen ama tüm işlemleri yöneten yapı katmanıdır. Bu yazımızda backend’in ne olduğunu ve neden kritik öneme sahip olduğunu açıklıyoruz. Veritabanı bağlantıları, API oluşturma, kullanıcı doğrulama (auth) gibi konuların temellerini anlatırken; Node.js, Express, Django gibi popüler backend teknolojilerine genel bir bakış sunuyoruz. Ayrıca REST mimarisi, HTTP metotları, middleware kullanımı gibi daha teknik detaylara da değiniyoruz. Eğer yazılımın sadece görünen kısmıyla değil, arka plandaki işleyişiyle ilgileniyorsan, bu yazı sana backend dünyasının kapılarını aralayacak.`,
          slug: "backend-nedir"
        }
      ];

      try {
        for (const blog of dummyBlogs) {
          await addDoc(blogsRef, blog);
          console.log("Eklendi:", blog.title);
        }
        alert("✅ Bloglar eklendi.");
      } catch (error) {
        console.error("❌ Blog eklenemedi:", error);
        alert("HATA! Konsolu kontrol et.");
      }
    };

    addBlogs();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <h1 className="text-xl font-semibold text-gray-700">
        Firestore’a blog ekleniyor...
      </h1>
    </div>
  );
};

export default AddBlogsOnce;
