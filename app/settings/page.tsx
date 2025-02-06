"use client";
import { useState, useEffect } from "react";
import { getCurrentUser } from "app/lib/firebase";
import Link from "next/link";
import { FaUser, FaBell, FaPalette, FaLanguage, FaLock } from "react-icons/fa";

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    getCurrentUser()
      .then((user: any) => {
        setUser(user);
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Inställningar</h1>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-4">
            {/* Sidopanel med inställningskategorier */}
            <div className="col-span-1 border-r border-gray-200 p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center p-3 rounded-lg ${
                    activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <FaUser className="mr-3" />
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center p-3 rounded-lg ${
                    activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <FaBell className="mr-3" />
                  Notifikationer
                </button>
                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`w-full flex items-center p-3 rounded-lg ${
                    activeTab === 'appearance' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <FaPalette className="mr-3" />
                  Utseende
                </button>
                <button
                  onClick={() => setActiveTab('language')}
                  className={`w-full flex items-center p-3 rounded-lg ${
                    activeTab === 'language' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <FaLanguage className="mr-3" />
                  Språk
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center p-3 rounded-lg ${
                    activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <FaLock className="mr-3" />
                  Säkerhet
                </button>
              </nav>
            </div>

            {/* Innehållsområde */}
            <div className="col-span-3 p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Profilinställningar</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Namn</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                        value={user?.displayName || ''}
                        placeholder="Ditt namn"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">E-post</label>
                      <input
                        type="email"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                        value={user?.email || ''}
                        disabled
                      />
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Spara ändringar
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Notifikationsinställningar</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>E-postnotifikationer</span>
                      <input type="checkbox" className="form-checkbox" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Push-notifikationer</span>
                      <input type="checkbox" className="form-checkbox" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Utseende</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Mörkt läge</span>
                      <input type="checkbox" className="form-checkbox" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'language' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Språkinställningar</h2>
                  <select className="block w-full rounded-md border border-gray-300 p-2">
                    <option value="sv">Svenska</option>
                    <option value="en">English</option>
                  </select>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Säkerhetsinställningar</h2>
                  <div className="space-y-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded">
                      Ändra lösenord
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">
                      Aktivera tvåfaktorsautentisering
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link href="/">
            <button className="bg-gray-500 text-white px-4 py-2 rounded">
              Tillbaka till Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}