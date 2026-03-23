import { useState } from "react";

interface TaskFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
  isLoading?: boolean;
}

export function TaskForm({ onSubmit, isLoading = false }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    try {
      await onSubmit(title, description);
      setTitle("");
      setDescription("");
    } catch {}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-4"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Task Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          disabled={isLoading}
          required
          className="w-full px-4 py-2 text-base sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description"
          disabled={isLoading}
          rows={3}
          className="w-full px-4 py-2 text-base sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:bg-gray-400 font-medium text-sm sm:text-base"
      >
        {isLoading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}
