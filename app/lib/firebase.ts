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

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  
  export const registerWithEmail = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const loginWithEmail = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, 
        (user) => {
          unsubscribe();
          resolve(user);
        },
        (error) => {
          unsubscribe();
          reject(error);
        }
      );
    });
  };