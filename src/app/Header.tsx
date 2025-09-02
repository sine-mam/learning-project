"use client";
import Link from "next/link";

export default function Header({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (d: boolean) => void }) {
  return (
    <header className="flex justify-between items-center py-6 px-4 max-w-5xl mx-auto">
      <nav className="flex gap-6 items-center">
        <Link href="/" className="font-bold text-lg text-blue-600">Home</Link>
        <Link href="/blog" className="font-bold text-lg text-teal-500">Blog</Link>
        <Link href="/about" className="font-bold text-lg text-purple-500">About</Link>
        <Link href="/contact" className="font-bold text-lg text-pink-500">Contact</Link>
      </nav>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </header>
  );
}
