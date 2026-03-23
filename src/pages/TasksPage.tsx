import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useTasks } from "../hooks/useTasks";
import { useToast } from "../contexts/ToastContext";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";

export function TasksPage() {
  const { user, logout } = useAuthContext();
  const { addToast } = useToast();
  const {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (error) {
      addToast(error, "error");
    }
  }, [error, addToast]);

  const handleCreateTask = async (title: string, description: string) => {
    setIsCreating(true);
    try {
      await createTask(title, description);
      addToast("Task created successfully!", "success");
    } catch {
      addToast("Failed to create task", "error");
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      await updateTask(id, { completed });
      addToast(
        completed ? "Task marked complete!" : "Task marked incomplete",
        "success",
      );
    } catch {
      addToast("Failed to update task", "error");
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        addToast("Task deleted successfully!", "success");
      } catch {
        addToast("Failed to delete task", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              My Tasks
            </h1>
            {user && (
              <p className="text-gray-600 text-sm sm:text-base">
                Welcome, {user.username}
              </p>
            )}
          </div>
          <button
            onClick={logout}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Task Form */}
        <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            Create a New Task
          </h2>
          <TaskForm onSubmit={handleCreateTask} isLoading={isCreating} />
        </section>

        {/* Tasks List */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            Your Tasks
          </h2>
          {isLoading ? (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">Loading tasks...</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          )}
        </section>
      </main>
    </div>
  );
}
