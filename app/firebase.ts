import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// 🔹 Ersätt med din faktiska Firebase-konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyCyw9RUvxPt110miRkL8nb96k1r3s-J8HI",
    authDomain: "kursplattform-1eb8a.firebaseapp.com",
    projectId: "kursplattform-1eb8a",
    storageBucket: "kursplattform-1eb8a.firebasestorage.app",
    messagingSenderId: "56836069310",
    appId: "1:56836069310:web:230e14bf504e304d234bef"
  };

// 🔹 Initiera Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 🔹 Fix: Exportera signInWithGoogle korrekt
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // Returnerar användarens info
  } catch (error) {
    console.error("Google Login Error:", error);
    throw error;
  }
};

import { createUserWithEmailAndPassword } from "firebase/auth";

export const registerWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};

import { signInWithEmailAndPassword } from "firebase/auth";

// 🔹 Funktion för att logga in med e-post & lösenord
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Returnerar användarinformation
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

import { onAuthStateChanged } from "firebase/auth";

// 🔹 Funktion för att hämta aktuell användare
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject("Ingen användare inloggad.");
      }
    });
  });
};
