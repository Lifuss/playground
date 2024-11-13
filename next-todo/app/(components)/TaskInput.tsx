import { useState } from "react";

const TaskInput = ({ addTask }: { addTask: (text: string) => void }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
      setInput("");
    }
  };

  return (
    <form
      className="mb-4 flex flex-col w-[250px] mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Нове завдання"
        className="text-black rounded-md p-2"
      />
      <button type="submit">Додати</button>
    </form>
  );
};

export default TaskInput;
