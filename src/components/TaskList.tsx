import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion } from "framer-motion";

export function TaskList({ selectedDate }: { selectedDate: string }) {
  const tasks = useQuery(api.tasks.getTasks, { date: selectedDate }) || [];
  const toggleComplete = useMutation(api.tasks.toggleTaskComplete);

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <motion.div
          key={task._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-4 rounded-lg border ${
            task.completed
              ? "bg-gray-800/50 border-gray-700"
              : "bg-gray-800 border-cyan-700"
          } transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]`}
        >
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete({ taskId: task._id })}
              className="mt-1 h-5 w-5 rounded border-cyan-700 bg-gray-700 text-cyan-500 focus:ring-cyan-500"
            />
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${
                task.completed ? "text-gray-400 line-through" : "text-cyan-300"
              }`}>
                {task.title}
              </h3>
              <p className={`mt-1 text-sm ${
                task.completed ? "text-gray-500" : "text-cyan-100"
              }`}>
                {task.description}
              </p>
              {task.time && (
                <p className="mt-2 text-sm text-cyan-400">
                  Scheduled for: {task.time}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
      {tasks.length === 0 && (
        <p className="text-center text-gray-400">No tasks for this date</p>
      )}
    </div>
  );
}
