"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";



export default function Home() {
  type HomeAcf = {
    heroTitle?: string;
    heroDescription?: string;
    feature1?: string;
    feature2?: string;
    feature3?: string;
  };
  const [acf, setAcf] = useState<HomeAcf | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("https://darkturquoise-falcon-503981.hostingersite.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          page(id: \"/\", idType: URI) {
            title
            homePage {
              heroTitle
              heroDescription
              feature1
              feature2
              feature3
            }
          }
        }`
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch home page");
        return res.json();
      })
      .then((data) => {
        if (data.data && data.data.page && data.data.page.homePage) {
          setAcf(data.data.page.homePage);
        } else {
          setError("No homePage content found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className={`min-h-screen py-10 px-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      {loading && <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {acf && (
        <div className={`max-w-3xl mx-auto text-center py-16`}>
          <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            {acf.heroTitle || "Welcome to Your Headless Site"}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {acf.heroDescription || "Powered by Next.js, TailwindCSS, and WordPress. Easily manage content and deliver a blazing-fast experience."}
          </p>
          <Link
            href="/blog"
            className="inline-block px-8 py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Read Our Blog
          </Link>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-2 text-blue-600">Fast</h2>
              <p className="text-gray-600 dark:text-gray-300">{acf.feature1 || "Next.js delivers instant page loads and smooth navigation."}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-2 text-teal-500">Flexible</h2>
              <p className="text-gray-600 dark:text-gray-300">{acf.feature2 || "Manage all your content in WordPress, display anywhere."}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-2 text-purple-500">Customizable</h2>
              <p className="text-gray-600 dark:text-gray-300">{acf.feature3 || "Style and extend with TailwindCSS and React components."}</p>
            </div>
          </div>
        </div>
      )}
      <Footer darkMode={darkMode} />
    </div>
  );
}
