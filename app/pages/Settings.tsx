"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "../firebase";
import Link from "next/link";

export default function Settings() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getCurrentUser()
      .then((user: any) => {
        setUser(user);
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Inställningar</h1>
        {user ? (
          <>
            <p className="text-lg font-semibold">Användare: {user.displayName || user.email}</p>
            <p className="text-gray-600">E-post: {user.email}</p>
            <hr className="my-4 border-gray-300" />
            <button onClick={() => alert("Ändring av lösenord kommer snart!")} className="w-full bg-blue-500 text-white py-2 rounded mb-2">
              Ändra lösenord
            </button>
            <button onClick={() => alert("Profiländring kommer snart!")} className="w-full bg-gray-300 py-2 rounded">
              Redigera profil
            </button>
          </>
        ) : (
          <p className="text-red-500">Ingen användare inloggad.</p>
        )}
        <hr className="my-4 border-gray-300" />
        <Link href="/">
          <button className="w-full bg-red-500 text-white py-2 rounded">Tillbaka</button>
        </Link>
      </div>
    </div>
  );
}
