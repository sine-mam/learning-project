"use client";
export default function Footer({ darkMode }: { darkMode: boolean }) {
  return (
    <footer className={`mt-16 text-center text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
      Powered by Next.js, TailwindCSS & WordPress GraphQL
    </footer>
  );
}
