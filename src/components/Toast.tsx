import { useEffect } from "react";
import type { Toast } from "../contexts/ToastContext";
import { useToast } from "../contexts/ToastContext";

interface ToastItemProps {
  toast: Toast;
}

function ToastItem({ toast }: ToastItemProps) {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  }[toast.type];

  const icon = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠",
  }[toast.type];

  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in`}
    >
      <span className="text-lg font-bold">{icon}</span>
      <span>{toast.message}</span>
      <button
        onClick={() => removeToast(toast.id)}
        className="ml-auto text-lg hover:opacity-80 transition"
      >
        ✕
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-full max-w-sm px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
