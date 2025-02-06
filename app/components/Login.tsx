"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle, registerWithEmail, loginWithEmail } from "app/lib/firebase";
import { FaCog } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [view, setView] = useState<'login' | 'register'>('login');
  
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);
      router.replace("/dashboard");
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

  const handleAdminLogin = () => {
    // Simulera att admin är inloggad direkt genom att sätta en flagga
    localStorage.setItem("isAdmin", "true");
    router.replace("/admin/course-builder");
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-white">
      {/* Diskret kugghjul-knapp i övre högra hörnet */}
      <button 
        onClick={handleAdminLogin}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        title="Logga in som admin"
      >
        <FaCog size={24} />
      </button>
      
      <h1 className="text-7xl font-bold text-center">Välkommen</h1>
      <p className="text-xl text-gray-600 text-center mt-1">Till ditt personliga utbildningsbibliotek</p>
      
      <div className="w-full max-w-sm space-y-4 mt-10 flex flex-col items-center">
        {view === 'login' ? (
          <>
            <input 
              type="email" 
              placeholder="E-post" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && passwordRef.current?.focus()}
              className="w-full p-2 border rounded-md text-base focus:ring-2 focus:ring-blue-400" 
            />
            <input 
              ref={passwordRef}
              type="password" 
              placeholder="Lösenord" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full p-2 border rounded-md text-base focus:ring-2 focus:ring-blue-400" 
            />
            <button 
              onClick={handleLogin} 
              className="w-2/3 bg-blue-500 text-white py-3 rounded-md text-lg hover:bg-blue-600 transition text-center"
            >
              Logga in
            </button>
            <button 
              onClick={() => setView('register')}
              className="w-2/3 bg-green-500 text-white py-3 rounded-md text-lg hover:bg-green-600 transition text-center"
            >
              Registrera konto
            </button>
          </>
        ) : (
          <>
            <input 
              type="email" 
              placeholder="E-post" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && passwordRef.current?.focus()}
              className="w-full p-2 border rounded-md text-base focus:ring-2 focus:ring-blue-400" 
            />
            <input 
              ref={passwordRef}
              type="password" 
              placeholder="Lösenord" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && confirmPasswordRef.current?.focus()}
              className="w-full p-2 border rounded-md text-base focus:ring-2 focus:ring-blue-400" 
            />
            <input 
              ref={confirmPasswordRef}
              type="password" 
              placeholder="Bekräfta lösenord" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
              className="w-full p-2 border rounded-md text-base focus:ring-2 focus:ring-blue-400" 
            />
            <button 
              onClick={handleRegister} 
              className="w-2/3 bg-green-500 text-white py-3 rounded-md text-lg hover:bg-green-600 transition text-center"
            >
              Skapa konto
            </button>
            <button 
              onClick={() => setView('login')}
              className="text-blue-500 underline mt-2"
            >
              Tillbaka till inloggning
            </button>
          </>
        )}
        <hr className="border-gray-300 my-20 w-2/3" />
        <button 
          onClick={async () => {
            try {
              await signInWithGoogle();
              router.replace("/dashboard");
            } catch (error) {
              alert("Google-inloggning misslyckades. Kontrollera din Firebase-konfiguration.");
            }
          }} 
          className="w-2/3 bg-red-500 text-white py-3 rounded-md text-lg flex items-center justify-center gap-3 hover:bg-red-600 transition"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Google_Icon.png/512px-Google_Icon.png" alt="Google" className="w-6 h-6" /> 
          Logga in med Google
        </button>
      </div>
    </div>
  );
}
