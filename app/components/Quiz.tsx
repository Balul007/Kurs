"use client";

import { useState } from "react";

interface Question {
  id: string;
  question: string;
  type: "radio" | "checkbox" | "fill-in";
  options?: string[];
  // För radio-typ: ett korrekt svar
  correctAnswer?: string;
  // För checkbox-typ: flera korrekta svar
  correctAnswers?: string[];
}

const sampleQuestions: Question[] = [
  {
    id: "q1",
    question: "Vilken formel används för att summera ett intervall i Excel?",
    type: "fill-in",
    correctAnswer: "SUMMA",
  },
  {
    id: "q2",
    question: "Vilket av följande är snabbkommando för att spara i Word?",
    type: "radio",
    options: ["Ctrl + S", "Ctrl + P", "Ctrl + C", "Ctrl + V"],
    correctAnswer: "Ctrl + S",
  },
  {
    id: "q3",
    question: "Välj de format som oftast används för numeriska värden:",
    type: "checkbox",
    options: ["Valuta", "Datum", "Text", "Procent"],
    correctAnswers: ["Valuta", "Procent"],
  },
];

export default function Quiz() {
  // Spara svaren: för radio och fill-in som string, för checkbox som array
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  const handleChangeRadio = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleChangeCheckbox = (questionId: string, option: string, checked: boolean) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) || [];
      let updated: string[];
      if (checked) {
        updated = [...current, option];
      } else {
        updated = current.filter((item) => item !== option);
      }
      return { ...prev, [questionId]: updated };
    });
  };

  const handleChangeFillIn = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    const newFeedback: { [key: string]: string } = {};

    sampleQuestions.forEach((q) => {
      if (q.type === "fill-in") {
        const userAnswer = ((answers[q.id] as string) || "").trim().toLowerCase();
        const correct = q.correctAnswer?.trim().toLowerCase();
        if (userAnswer === correct) {
          newScore++;
          newFeedback[q.id] = "Rätt!";
        } else {
          newFeedback[q.id] = `Fel! Rätt svar är: ${q.correctAnswer}`;
        }
      } else if (q.type === "radio") {
        const userAnswer = answers[q.id] as string;
        if (userAnswer === q.correctAnswer) {
          newScore++;
          newFeedback[q.id] = "Rätt!";
        } else {
          newFeedback[q.id] = `Fel! Rätt svar är: ${q.correctAnswer}`;
        }
      } else if (q.type === "checkbox") {
        const userAnswers = (answers[q.id] as string[]) || [];
        const correctAnswers = q.correctAnswers || [];
        const isCorrect =
          correctAnswers.length === userAnswers.length &&
          correctAnswers.every((ans) => userAnswers.includes(ans));
        if (isCorrect) {
          newScore++;
          newFeedback[q.id] = "Rätt!";
        } else {
          newFeedback[q.id] = `Fel! Rätt svar är: ${correctAnswers.join(", ")}`;
        }
      }
    });

    setScore(newScore);
    setFeedback(newFeedback);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Quiz</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {sampleQuestions.map((q) => (
          <div key={q.id} className="mb-6 border-b pb-4">
            <p className="mb-2 font-semibold">{q.question}</p>
            {q.type === "radio" && q.options && (
              <div>
                {q.options.map((option) => (
                  <label key={option} className="block mb-1">
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={(e) => handleChangeRadio(q.id, e.target.value)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {q.type === "checkbox" && q.options && (
              <div>
                {q.options.map((option) => {
                  const checked = ((answers[q.id] as string[]) || []).includes(option);
                  return (
                    <label key={option} className="block mb-1">
                      <input
                        type="checkbox"
                        name={`${q.id}-${option}`}
                        value={option}
                        checked={checked}
                        onChange={(e) => handleChangeCheckbox(q.id, option, e.target.checked)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            )}
            {q.type === "fill-in" && (
              <input
                type="text"
                name={q.id}
                value={(answers[q.id] as string) || ""}
                onChange={(e) => handleChangeFillIn(q.id, e.target.value)}
                className="p-2 border rounded w-full"
              />
            )}
            {feedback[q.id] && <p className="mt-2 text-sm">{feedback[q.id]}</p>}
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded transition-colors"
        >
          Skicka in svar
        </button>
      </form>
      {score !== null && (
        <div className="mt-4">
          <h2 className="text-2xl">
            Ditt resultat: {score} / {sampleQuestions.length}
          </h2>
        </div>
      )}
    </div>
  );
}
