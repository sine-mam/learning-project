"use client";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  uri: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
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
          posts(first: 30) {
            nodes {
              id
              title
              excerpt
              uri
            }
          }
        }`
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        if (data.data && data.data.posts && data.data.posts.nodes) {
          setPosts(data.data.posts.nodes);
        } else {
          setError("No posts found");
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
      <h1 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>Blog</h1>
      {loading && <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading posts...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-300`}>
            <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-white'}`} dangerouslySetInnerHTML={{ __html: post.title }} />
            <div className={`prose prose-sm mb-4 ${darkMode ? 'prose-invert' : ''}`} dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            <a
              href={"https://darkturquoise-falcon-503981.hostingersite.com" + post.uri}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-blue-600 dark:text-blue-400 hover:underline`}
            >
              Read more
            </a>
          </div>
        ))}
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
}
