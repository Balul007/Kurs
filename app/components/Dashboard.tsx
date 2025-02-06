
"use client";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../lib/firebase";
import Sidebar from "./Sidebar";  // eftersom den ligger i samma mapp

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getCurrentUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar onLogout={onLogout} user={user} />
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold">Välkommen {user ? user.displayName || user.email : "Användare"}!</h1>
        <p className="text-lg text-gray-600 mt-2">Här hittar du dina kurser och framsteg.</p>
      </main>
    </div>
  );
}
