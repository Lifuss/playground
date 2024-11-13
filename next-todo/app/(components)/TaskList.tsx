import { Task } from "../page";

const TaskList = ({
  tasks,
  onToggle,
  onDragStart,
  onDrop,
}: {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDragStart: (id: string) => void;
  onDrop: (id: string) => void;
}) => {
  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          draggable
          onDragStart={() => onDragStart(task.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(task.id)}
          className="p-2 border w-fit border-white rounded-md"
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            cursor: "move",
          }}
        >
          <span onClick={() => onToggle(task.id)}>{task.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
