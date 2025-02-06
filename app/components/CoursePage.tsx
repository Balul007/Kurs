"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import coursesData from "app/lib/courses.json";
import ProgressBar from "./ProgressBar";

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export default function CoursePage() {
  const params = useParams();
  const courseId = params?.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    const foundCourse = (coursesData.courses as Course[]).find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      const savedProgress = localStorage.getItem(`course-progress-${courseId}`);
      if (savedProgress) {
        setCurrentLessonIndex(parseInt(savedProgress, 10));
      }
    }
  }, [courseId]);

  const handleNextLesson = () => {
    if (course && currentLessonIndex < course.lessons.length - 1) {
      const newIndex = currentLessonIndex + 1;
      setCurrentLessonIndex(newIndex);
      localStorage.setItem(`course-progress-${courseId}`, newIndex.toString());
    }
  };

  const handlePrevLesson = () => {
    if (course && currentLessonIndex > 0) {
      const newIndex = currentLessonIndex - 1;
      setCurrentLessonIndex(newIndex);
      localStorage.setItem(`course-progress-${courseId}`, newIndex.toString());
    }
  };

  if (!course) return <div>Laddar kursdata...</div>;

  const lesson = course.lessons[currentLessonIndex];
  const progressPercentage = ((currentLessonIndex + 1) / course.lessons.length) * 100;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-6">{course.description}</p>
      
      {/* Progressbar */}
      <ProgressBar progress={progressPercentage} />
      
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mt-4">{lesson.title}</h2>
        <p className="mt-4">{lesson.content}</p>
        {lesson.videoUrl && (
          <div className="mt-4">
            <video controls width="100%">
              <source src={lesson.videoUrl} type="video/mp4" />
              Din webbläsare stödjer inte videouppspelning.
            </video>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <button 
          onClick={handlePrevLesson}
          disabled={currentLessonIndex === 0}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded disabled:opacity-50 transition-colors"
        >
          Föregående
        </button>
        <button 
          onClick={handleNextLesson}
          disabled={currentLessonIndex >= course.lessons.length - 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 transition-colors"
        >
          Nästa
        </button>
      </div>
    </div>
  );
}
