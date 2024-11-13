"use client";
import React, { useState, useEffect } from "react";
import TaskInput from "./(components)/TaskInput";
import TaskList from "./(components)/TaskList";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDragStart = (id: string) => setDraggingTaskId(id);

  const handleDrop = (id: string) => {
    if (!draggingTaskId) return;
    const draggedIndex = tasks.findIndex((task) => task.id === draggingTaskId);
    const droppedIndex = tasks.findIndex((task) => task.id === id);
    const reorderedTasks = [...tasks];
    const [removed] = reorderedTasks.splice(draggedIndex, 1);
    reorderedTasks.splice(droppedIndex, 0, removed);
    setTasks(reorderedTasks);
    setDraggingTaskId(null);
  };

  return (
    <div className="px-14 py-6">
      <h1 className="text-4xl text-center mb-4">Todo List</h1>
      <TaskInput addTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggle={toggleTaskCompletion}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      />
    </div>
  );
}
