"use client";

import { useState } from "react";
import { signInWithGoogle, registerWithEmail, loginWithEmail } from "app/lib/firebase";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [view, setView] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);
      onLogin();
    } catch (error) {
      alert("Misslyckades att logga in. Kontrollera dina uppgifter.");
    }
  };

  const handleRegister = async () => {
    if (!email || !password || password !== confirmPassword) {
      alert("Lösenorden matchar inte eller fält saknas.");
      return;
    }
    try {
      await registerWithEmail(email, password);
      alert("Konto skapat! Du kan nu logga in.");
      setView("login");
    } catch (error) {
      alert("Misslyckades att skapa konto. Prova igen.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Välkommen</h1>
        <p className="text-lg text-gray-600 mt-2">Till ditt personliga utbildningsbibliotek</p>
        <div className="mt-6">
          {view === 'login' && (
            <>
              <input type="email" placeholder="E-post" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mt-2" />
              <input type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mt-2" />
              <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 rounded mt-2">Logga in</button>
              <button onClick={() => setView('register')} className="mt-4 text-blue-500 underline">Registrera konto</button>
            </>
          )}
          {view === 'register' && (
            <>
              <input type="email" placeholder="E-post" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mt-2" />
              <input type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mt-2" />
              <input type="password" placeholder="Bekräfta lösenord" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded mt-2" />
              <button onClick={handleRegister} className="w-full bg-green-500 text-white py-2 rounded mt-2">Skapa konto</button>
              <button onClick={() => setView('login')} className="mt-4 text-blue-500 underline">Tillbaka</button>
            </>
          )}
          <hr className="my-4 border-gray-400" />
          <button onClick={async () => {
  try {
    await signInWithGoogle();
    onLogin(); // 🔹 Skickar användaren till Dashboard efter inloggning
  } catch (error) {
    console.error("Google Login Error:", error);
    alert("Google-inloggning misslyckades. Kontrollera din Firebase-konfiguration.");
  }
}} className="w-full bg-red-500 text-white py-2 rounded">
  Logga in med Google
</button>

        </div>
      </div>
    </div>
  );
}
