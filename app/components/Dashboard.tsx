"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const router = useRouter();
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);

  useEffect(() => {
    // Hämta sparade kurser från admin
    const storedCourses = JSON.parse(localStorage.getItem("adminCourses") || "[]");
    setAvailableCourses(storedCourses);

    // Hämta användarens pågående kurser
    const storedUserCourses = JSON.parse(localStorage.getItem("userCourses") || "[]");
    setUserCourses(storedUserCourses);
  }, []);

  const addCourseToUser = (course: any) => {
    // Om kursen inte redan finns hos användaren
    if (!userCourses.find(c => c.id === course.id)) {
      const updated = [...userCourses, course];
      setUserCourses(updated);
      localStorage.setItem("userCourses", JSON.stringify(updated));
    }
  };

  const handleLogout = () => {
    // Utloggningslogik
    router.replace("/");
  };

  return (
    <div className="flex h-screen">
      <Sidebar onLogout={handleLogout} user={null} />
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div>
          <h2 className="text-xl mb-2">Möjliga kurser</h2>
          <ul className="space-y-2">
            {availableCourses.map(course => (
              <li key={course.id}>
                <button
                  onClick={() => addCourseToUser(course)}
                  className="text-blue-500 underline"
                >
                  {course.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-xl mb-2">Pågående kurser</h2>
          <ul className="space-y-2">
            {userCourses.map(course => (
              <li key={course.id}>
                <button
                  onClick={() => router.push(`/course/${course.id}`)}
                  className="text-blue-500 underline"
                >
                  {course.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
