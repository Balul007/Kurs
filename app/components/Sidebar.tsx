"use client";

import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt, FaPalette, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar({ onLogout, user }: { onLogout: () => void, user: any }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
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
    <aside className="fixed left-0 top-0 h-full w-64 p-4 bg-gray-800 text-white shadow-lg flex flex-col">
      <div 
        className="flex items-center justify-start cursor-pointer p-4 border-b border-gray-700"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <FaUserCircle size={40} className="text-white mr-3" />
        <div>
          <p className="font-bold">{user ? user.displayName || user.email : "Gäst"}</p>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>
      </div>
      {showUserMenu && (
        <div ref={menuRef} className="absolute top-14 left-0 bg-gray-700 w-full rounded shadow-lg z-10">
          <Link href="/settings">
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
    <nav className="flex flex-col space-y-2 mt-6 px-2">
      <button 
    className="text-base font-normal w-full text-left p-2 flex justify-between items-center hover:bg-gray-700 pl-2 pr-4"
    onClick={() => setExpandedSection(expandedSection === "ongoing" ? null : "ongoing")}
    >
    📖 Pågående Kurser {expandedSection === "ongoing" ? <FaChevronUp /> : <FaChevronDown />}
    </button>
    {expandedSection === "ongoing" && (
    <div className="pl-6 text-sm space-y-2">
      <Link href="/course/excel-grundkurs" className="hover:text-gray-300 cursor-pointer block">
        Excel Grundkurs
      </Link>
      <Link href="/course/word-avanserad" className="hover:text-gray-300 cursor-pointer block">
        Word Avancerad
      </Link>
      <Link href="/course/powerpoint-presentationsteknik" className="hover:text-gray-300 cursor-pointer block">
        PowerPoint Presentationsteknik
      </Link>
    </div>
  )}
  <button 
    className="text-base font-normal w-full text-left p-2 flex justify-between items-center hover:bg-gray-700 pl-2 pr-4"
    onClick={() => setExpandedSection(expandedSection === "available" ? null : "available")}
  >
    📘 Möjliga Kurser {expandedSection === "available" ? <FaChevronUp /> : <FaChevronDown />}
  </button>
  {expandedSection === "available" && (
    <div className="pl-6 text-sm space-y-2">
      <Link href="/course/excel-avancerad" className="hover:text-gray-300 cursor-pointer block">
        Excel Avancerad
      </Link>
      <Link href="/course/word-mallhantering" className="hover:text-gray-300 cursor-pointer block">
        Word Mallhantering
      </Link>
      <Link href="/course/powerpoint-animationer" className="hover:text-gray-300 cursor-pointer block">
        PowerPoint Animationer
      </Link>
    </div>
  )}
  <button 
    className="text-base font-normal w-full text-left p-2 flex justify-between items-center hover:bg-gray-700 pl-2 pr-4"
    onClick={() => setExpandedSection(expandedSection === "completed" ? null : "completed")}
  >
    📚 Klarade Kurser {expandedSection === "completed" ? <FaChevronUp /> : <FaChevronDown />}
  </button>
  {expandedSection === "completed" && (
    <div className="pl-6 text-sm space-y-2">
      <Link href="/course/excel-for-ekonomi" className="hover:text-gray-300 cursor-pointer block">
        Excel för Ekonomi
      </Link>
      <Link href="/course/word-skriva-rapporter" className="hover:text-gray-300 cursor-pointer block">
        Word Skriva Rapporter
      </Link>
      <Link href="/course/powerpoint-fordjupning" className="hover:text-gray-300 cursor-pointer block">
        PowerPoint Fördjupning
      </Link>
    </div>
  )}
</nav>
    </aside>
  );
}
