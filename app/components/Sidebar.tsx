"use client";
import { useState } from "react";
import { FaUserCircle, FaCog, FaSignOutAlt, FaBook, FaGraduationCap, FaCheckCircle, FaChevronDown } from "react-icons/fa";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  status: 'active' | 'available' | 'completed';
}

interface SidebarProps {
  onLogout: () => void;
  user: any;
}

export default function Sidebar({ onLogout, user }: SidebarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    active: true,
    available: false,
    completed: false
  });

  // Exempel på kursdata - ersätt med din faktiska data
  const courses: Course[] = [
    { id: '1', title: 'Introduktion till React', status: 'active' },
    { id: '2', title: 'Next.js Grundkurs', status: 'active' },
    { id: '3', title: 'TypeScript för Nybörjare', status: 'available' },
    { id: '4', title: 'HTML & CSS', status: 'completed' }
  ];

  const toggleMenu = (menu: keyof typeof openMenus) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-4">
      {/* Användarprofil */}
      <div className="mb-8">
        <div 
          className="flex items-center p-3 bg-gray-700 rounded-lg cursor-pointer"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <FaUserCircle size={40} className="text-gray-300" />
          <div className="ml-3 overflow-hidden">
            <p className="font-medium truncate">{user?.displayName || 'Användare'}</p>
            <p className="text-sm text-gray-400 truncate">{user?.email}</p>
          </div>
          <FaChevronDown className={`ml-auto transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
        </div>
        
        {showUserMenu && (
          <div className="mt-2 py-2 bg-gray-700 rounded-lg">
            <Link href="/settings">
              <div className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer">
                <FaCog className="mr-3" />
                Inställningar
              </div>
            </Link>
            <div 
              className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer"
              onClick={onLogout}
            >
              <FaSignOutAlt className="mr-3" />
              Logga ut
            </div>
          </div>
        )}
      </div>

      {/* Kurssektioner */}
      <div className="space-y-4">
        {/* Aktiva kurser */}
        <div>
          <button
            className="w-full flex items-center justify-between p-3 bg-gray-700 rounded-lg"
            onClick={() => toggleMenu('active')}
          >
            <div className="flex items-center">
              <FaBook className="mr-3" />
              <span>Aktiva kurser</span>
            </div>
            <FaChevronDown className={`transition-transform ${openMenus.active ? 'rotate-180' : ''}`} />
          </button>
          {openMenus.active && (
            <div className="mt-2 ml-4 space-y-2">
              {courses.filter(c => c.status === 'active').map(course => (
                <div key={course.id} className="p-2 hover:bg-gray-700 rounded cursor-pointer">
                  {course.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tillgängliga kurser */}
        <div>
          <button
            className="w-full flex items-center justify-between p-3 bg-gray-700 rounded-lg"
            onClick={() => toggleMenu('available')}
          >
            <div className="flex items-center">
              <FaGraduationCap className="mr-3" />
              <span>Tillgängliga kurser</span>
            </div>
            <FaChevronDown className={`transition-transform ${openMenus.available ? 'rotate-180' : ''}`} />
          </button>
          {openMenus.available && (
            <div className="mt-2 ml-4 space-y-2">
              {courses.filter(c => c.status === 'available').map(course => (
                <div key={course.id} className="p-2 hover:bg-gray-700 rounded cursor-pointer">
                  {course.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Avklarade kurser */}
        <div>
          <button
            className="w-full flex items-center justify-between p-3 bg-gray-700 rounded-lg"
            onClick={() => toggleMenu('completed')}
          >
            <div className="flex items-center">
              <FaCheckCircle className="mr-3" />
              <span>Avklarade kurser</span>
            </div>
            <FaChevronDown className={`transition-transform ${openMenus.completed ? 'rotate-180' : ''}`} />
          </button>
          {openMenus.completed && (
            <div className="mt-2 ml-4 space-y-2">
              {courses.filter(c => c.status === 'completed').map(course => (
                <div key={course.id} className="p-2 hover:bg-gray-700 rounded cursor-pointer">
                  {course.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}