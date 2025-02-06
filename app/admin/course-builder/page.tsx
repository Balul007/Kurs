"use client";

import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
}

interface ContentBlock {
  id: string;
  type: "video" | "quiz" | "simulation";
  content: string;
  quizQuestions?: QuizQuestion[];
}

interface Step {
  id: string;
  title: string;
  contents: ContentBlock[];
}

export default function CourseBuilder() {
  // Alla hooks kallas alltid i komponentens topp
  const [mounted, setMounted] = useState(false);
  const [courseTitle, setCourseTitle] = useState("Ny Excel Kurs");
  const [steps, setSteps] = useState<Step[]>([
    {
      id: uuidv4(),
      title: "Steg 1: Introduktion",
      contents: [],
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (
      result.source.droppableId === "steps" &&
      result.destination.droppableId === "steps"
    ) {
      const reorderedSteps = reorder(
        steps,
        result.source.index,
        result.destination.index
      );
      setSteps(reorderedSteps);
    } else if (
      result.source.droppableId.startsWith("contents-") &&
      result.destination.droppableId.startsWith("contents-")
    ) {
      const stepId = result.source.droppableId.split("contents-")[1];
      const stepIndex = steps.findIndex((s) => s.id === stepId);
      if (stepIndex === -1) return;
      const step = steps[stepIndex];
      const reorderedContents = reorder(
        step.contents,
        result.source.index,
        result.destination.index
      );
      const newSteps = [...steps];
      newSteps[stepIndex] = { ...step, contents: reorderedContents };
      setSteps(newSteps);
    }
  };

  const addStep = () => {
    const newStep: Step = {
      id: uuidv4(),
      title: "Nytt steg",
      contents: [],
    };
    setSteps((prev) => [...prev, newStep]);
  };

  const addContentBlock = (
    stepId: string,
    type: "video" | "quiz" | "simulation"
  ) => {
    let newBlock: ContentBlock;
    if (type === "quiz") {
      newBlock = {
        id: uuidv4(),
        type,
        content: "",
        quizQuestions: [],
      };
    } else {
      newBlock = {
        id: uuidv4(),
        type,
        content: `Innehåll för ${type}`,
      };
    }
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? { ...step, contents: [...step.contents, newBlock] }
          : step
      )
    );
  };

  const updateStepTitle = (stepId: string, title: string) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, title } : step))
    );
  };

  const updateContentBlock = (
    stepId: string,
    blockId: string,
    content: string
  ) => {
    setSteps((prev) =>
      prev.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            contents: step.contents.map((block) =>
              block.id === blockId ? { ...block, content } : block
            ),
          };
        }
        return step;
      })
    );
  };

  const updateQuizQuestions = (
    stepId: string,
    blockId: string,
    quizQuestions: QuizQuestion[]
  ) => {
    setSteps((prev) =>
      prev.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            contents: step.contents.map((block) =>
              block.id === blockId ? { ...block, quizQuestions } : block
            ),
          };
        }
        return step;
      })
    );
  };

  const saveCourse = () => {
    const existingCourses = JSON.parse(
      localStorage.getItem("adminCourses") || "[]"
    );
    const newCourse = {
      id: uuidv4(),
      title: courseTitle,
      steps,
    };
    const updatedCourses = [...existingCourses, newCourse];
    localStorage.setItem("adminCourses", JSON.stringify(updatedCourses));
    alert("Kurs sparad!");
  };

  // --- Ny komponent: VideoUploader ---
  function VideoUploader({
    block,
    stepId,
  }: {
    block: ContentBlock;
    stepId: string;
  }) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const videoURL = URL.createObjectURL(file);
        updateContentBlock(stepId, block.id, videoURL);
      }
    };

    return (
      <div className="border p-2 rounded">
        <input type="file" accept="video/*" onChange={handleFileChange} />
        {block.content && (
          <video src={block.content} controls className="mt-2 w-full" />
        )}
      </div>
    );
  }

  // --- Ny komponent: QuizBuilder ---
  function QuizBuilder({
    block,
    stepId,
  }: {
    block: ContentBlock;
    stepId: string;
  }) {
    const addQuestion = () => {
      const newQuestion: QuizQuestion = {
        id: uuidv4(),
        question: "Ny fråga",
        options: ["", ""],
        correctOptionIndex: 0,
      };
      const updatedQuestions = block.quizQuestions
        ? [...block.quizQuestions, newQuestion]
        : [newQuestion];
      updateQuizQuestions(stepId, block.id, updatedQuestions);
    };

    const updateQuestion = (index: number, updatedQuestion: QuizQuestion) => {
      const newQuestions =
        block.quizQuestions?.map((q, i) => (i === index ? updatedQuestion : q)) || [];
      updateQuizQuestions(stepId, block.id, newQuestions);
    };

    return (
      <div className="border p-2 rounded">
        {block.quizQuestions &&
          block.quizQuestions.map((q, idx) => (
            <div key={q.id} className="mb-2 border p-2 rounded">
              <input
                type="text"
                value={q.question}
                onChange={(e) => {
                  const updatedQuestion = { ...q, question: e.target.value };
                  updateQuestion(idx, updatedQuestion);
                }}
                placeholder="Fråga"
                className="w-full p-1 border rounded mb-1"
              />
              {q.options.map((option, i) => (
                <div key={i} className="flex items-center mb-1">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...q.options];
                      newOptions[i] = e.target.value;
                      const updatedQuestion = { ...q, options: newOptions };
                      updateQuestion(idx, updatedQuestion);
                    }}
                    placeholder={`Alternativ ${i + 1}`}
                    className="w-full p-1 border rounded"
                  />
                  <input
                    type="radio"
                    name={`correct-${q.id}`}
                    checked={q.correctOptionIndex === i}
                    onChange={() => {
                      const updatedQuestion = { ...q, correctOptionIndex: i };
                      updateQuestion(idx, updatedQuestion);
                    }}
                    className="ml-2"
                  />
                </div>
              ))}
            </div>
          ))}
        <button
          onClick={addQuestion}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Lägg till fråga
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {mounted ? (
        <>
          <h1 className="text-3xl font-bold mb-4">
            Course Builder - {courseTitle}
          </h1>
          <div className="mb-4">
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="Ange kursnamn"
            />
          </div>
          <button
            onClick={addStep}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Lägg till nytt steg
          </button>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="steps" isDropDisabled={false}>
              {(provided: DroppableProvided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {steps.map((step, index) => (
                    <Draggable key={step.id} draggableId={step.id} index={index}>
                      {(provided: DraggableProvided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="mb-6 border rounded p-4 bg-white shadow"
                        >
                          <div className="flex items-center mb-2">
                            <span
                              {...provided.dragHandleProps}
                              className="mr-2 cursor-move text-gray-600"
                            >
                              ☰
                            </span>
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) =>
                                updateStepTitle(step.id, e.target.value)
                              }
                              className="text-xl font-semibold flex-grow p-1 border-b"
                            />
                          </div>
                          <Droppable
                            droppableId={`contents-${step.id}`}
                            isDropDisabled={false}
                          >
                            {(provided: DroppableProvided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="mb-2"
                              >
                                {step.contents.map((block, idx) => (
                                  <Draggable
                                    key={block.id}
                                    draggableId={block.id}
                                    index={idx}
                                  >
                                    {(provided: DraggableProvided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="p-2 border rounded mb-2 bg-gray-50"
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="font-semibold">
                                            {block.type.toUpperCase()}
                                          </span>
                                        </div>
                                        {block.type === "quiz" ? (
                                          <QuizBuilder
                                            block={block}
                                            stepId={step.id}
                                          />
                                        ) : block.type === "video" ? (
                                          <VideoUploader
                                            block={block}
                                            stepId={step.id}
                                          />
                                        ) : (
                                          <textarea
                                            value={block.content}
                                            onChange={(e) =>
                                              updateContentBlock(
                                                step.id,
                                                block.id,
                                                e.target.value
                                              )
                                            }
                                            className="w-full p-2 mt-1 border rounded"
                                            rows={2}
                                          ></textarea>
                                        )}
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                addContentBlock(step.id, "video")
                              }
                              className="bg-green-500 text-white px-2 py-1 rounded"
                            >
                              + Video
                            </button>
                            <button
                              onClick={() =>
                                addContentBlock(step.id, "quiz")
                              }
                              className="bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                              + Quiz
                            </button>
                            <button
                              onClick={() =>
                                addContentBlock(step.id, "simulation")
                              }
                              className="bg-purple-500 text-white px-2 py-1 rounded"
                            >
                              + Simulering
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button
            onClick={saveCourse}
            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Spara kurs
          </button>
        </>
      ) : null}
    </div>
  );
}
