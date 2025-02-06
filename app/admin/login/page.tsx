"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Enkel kontroll – ersätt med verklig autentisering vid behov
    if (username === "admin" && password === "admin") {
      router.replace("/admin/course-builder");
    } else {
      alert("Fel användarnamn eller lösenord");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={handleLogin} className="w-80 flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Logga in
        </button>
      </form>
    </div>
  );
}
