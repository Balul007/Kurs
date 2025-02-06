"use client";

import { useState, useEffect } from "react";
import coursesData from "app/lib/courses.json";

export default function AdminPanel() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    // I en verklig app ersätts detta med ett API-anrop eller databasfråga
    setCourses(coursesData.courses);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel - Hantera kurser</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Lägg till ny kurs</button>
      <div>
        {courses.map(course => (
          <div key={course.id} className="border p-4 mb-2">
            <h2 className="text-2xl">{course.title}</h2>
            <p>{course.description}</p>
            <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">Redigera</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded">Ta bort</button>
          </div>
        ))}
      </div>
    </div>
  );
}
