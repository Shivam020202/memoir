import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function CreateTaskForm({ selectedDate }: { selectedDate: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  
  const createTask = useMutation(api.tasks.createTask);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask({ 
        title, 
        description, 
        date: selectedDate,
        time: time || undefined 
      });
      setTitle("");
      setDescription("");
      setTime("");
      toast.success("Task created!");
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full bg-gray-800 text-cyan-50 border border-cyan-700 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all hover:border-cyan-500"
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="w-full bg-gray-800 text-cyan-50 border border-cyan-700 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all hover:border-cyan-500"
        />
      </div>
      <div>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-gray-800 text-cyan-50 border border-cyan-700 rounded-lg p-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all hover:border-cyan-500"
        />
      </div>
      <button
        type="submit"
        disabled={!title}
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
      >
        Add Task
      </button>
    </form>
  );
}
