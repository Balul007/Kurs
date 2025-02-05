"use client";

import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt, FaPalette } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar({ onLogout, user }: { onLogout: () => void, user: any }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <aside className={`w-64 p-4 relative ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'}`}>
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}>
        <FaUserCircle size={32} />
        <div className="ml-2">
          <p className="font-bold">{user ? user.displayName || user.email : "Gäst"}</p>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
      </div>
      {showUserMenu && (
        <div ref={menuRef} className="absolute top-12 left-0 bg-gray-700 w-full rounded shadow-lg">
<Link href="/Settings">
  <button className="w-full flex items-center p-2 hover:bg-gray-600">
    <FaCog className="mr-2" /> Inställningar
  </button>
</Link>


          <button 
            className="w-full flex items-center p-2 hover:bg-gray-600" 
            onClick={() => setDarkMode(!darkMode)}>
            <FaPalette className="mr-2" /> {darkMode ? "Ljust läge" : "Mörkt läge"}
          </button>
          <button className="w-full flex items-center p-2 hover:bg-gray-600" onClick={onLogout}>
            <FaSignOutAlt className="mr-2" /> Logga ut
          </button>
        </div>
      )}
      <h2 className="text-lg font-bold mt-6">📚 Kurser</h2>
      <div>
        <button className="w-full text-left p-2 bg-gray-700 rounded">📖 Pågående Kurser</button>
        <button className="w-full text-left p-2 bg-gray-700 rounded">📘 Möjliga Kurser</button>
        <button className="w-full text-left p-2 bg-gray-700 rounded">📚 Klarade Kurser</button>
      </div>
    </aside>
  );
}
