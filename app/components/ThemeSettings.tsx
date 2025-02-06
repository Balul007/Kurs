"use client";

import { useState, useEffect } from "react";

export default function ThemeSettings() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="text-xl mb-4">Tema Inställningar</h2>
      <div>
        <label className="mr-4">
          <input 
            type="radio" 
            value="light" 
            checked={theme === "light"}
            onChange={() => setTheme("light")}
          /> 
          Ljust läge
        </label>
        <label>
          <input 
            type="radio" 
            value="dark" 
            checked={theme === "dark"}
            onChange={() => setTheme("dark")}
          /> 
          Mörkt läge
        </label>
      </div>
    </div>
  );
}
