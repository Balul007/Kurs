"use client";

interface ProgressBarProps {
  progress: number; // mellan 0 och 100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-300 rounded-full h-2 mt-4">
      <div
        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
