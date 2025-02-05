"use client";

import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<"dashboard" | "Settings" | "login">("login");

  return view === "Settings" ? (
    <Settings />
  ) : isLoggedIn ? (
    <Dashboard onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <Login onLogin={() => setIsLoggedIn(true)} />
  );
}
