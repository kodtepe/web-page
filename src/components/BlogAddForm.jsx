import React from "react";

const BlogAddForm = ({ blogInput, setBlogInput, addBlog }) => {
  return (
    <form
      onSubmit={addBlog}
      className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Yeni Blog Ekle</h2>
      <input
        type="text"
        placeholder="Başlık"
        value={blogInput.title}
        onChange={(e) => setBlogInput({ ...blogInput, title: e.target.value })}
        className="w-full border rounded px-3 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Etiketler (virgülle ayırın)"
        value={blogInput.tags}
        onChange={(e) => setBlogInput({ ...blogInput, tags: e.target.value })}
        className="w-full border rounded px-3 py-2 text-black"
      />
      <textarea
        placeholder="Özet"
        rows={3}
        value={blogInput.summary}
        onChange={(e) => setBlogInput({ ...blogInput, summary: e.target.value })}
        className="w-full border rounded px-3 py-2 text-black"
      />
      <textarea
        placeholder="İçerik"
        rows={6}
        value={blogInput.content}
        onChange={(e) => setBlogInput({ ...blogInput, content: e.target.value })}
        className="w-full border rounded px-3 py-2 text-black"
      />
      <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded">
        Kaydet
      </button>
    </form>
  );
};

export default BlogAddForm; 