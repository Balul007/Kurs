"use client";

import { useState } from "react";
import Login from "app/components/Login";
import Dashboard from "app/components/Dashboard";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<"dashboard" | "Settings" | "login">("login");

  return isLoggedIn ? (
    <Dashboard onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <Login onLogin={() => setIsLoggedIn(true)} />
  );
}
