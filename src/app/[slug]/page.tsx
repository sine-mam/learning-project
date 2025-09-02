"use client";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useParams } from "next/navigation";

export default function DynamicPage() {
  const { slug } = useParams();
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || "https://darkturquoise-falcon-503981.hostingersite.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          page(id: \"${slug}\", idType: URI) {
            title
            content
          }
        }`
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch page");
        return res.json();
      })
      .then((data) => {
        if (data.data && data.data.page) {
          setTitle(data.data.page.title || slug);
          setContent(data.data.page.content || "");
        } else {
          setError("No content found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className={`min-h-screen py-10 px-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <h1 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
      {loading && <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      <div className={`prose mx-auto ${darkMode ? 'prose-invert' : 'text-gray-800'}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Footer darkMode={darkMode} />
    </div>
  );
}
