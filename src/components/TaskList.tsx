import { useState } from "react";
import type { Task } from "../lib/api";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  const [filterBy, setFilterBy] = useState<"all" | "active" | "completed">(
    "all",
  );

  const filtered = tasks.filter((task) => {
    if (filterBy === "active") return !task.completed;
    if (filterBy === "completed") return task.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["all", "active", "completed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterBy(status)}
            className={`px-3 sm:px-4 py-2 rounded-lg capitalize transition text-sm sm:text-base font-medium ${
              filterBy === status
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:shadow-sm"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-400 text-sm sm:text-base">
            No tasks yet. Create one to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
