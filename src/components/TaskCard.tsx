import type { Task } from "../lib/api";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-4 hover:shadow-md transition">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => onToggle(task.id, e.target.checked)}
        className="w-5 h-5 text-blue-600 rounded cursor-pointer flex-shrink-0 mt-1"
      />

      <div className="flex-1 min-w-0">
        <h3
          className={`font-semibold text-base sm:text-lg break-words ${
            task.completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="text-gray-600 mt-2 text-sm break-words">
            {task.description}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-3">
          {new Date(task.created_at).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="w-full sm:w-auto px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm font-medium flex-shrink-0"
      >
        Delete
      </button>
    </div>
  );
}
