import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { CheckCircle, Clock, ListPlus } from "@phosphor-icons/react";

export function ProfileScreen() {
  const tasks = useQuery(api.tasks.getAllTasks) || [];
  
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={<ListPlus className="text-blue-500" size={24} />}
          label="Total Tasks"
          value={stats.total}
        />
        <StatCard
          icon={<CheckCircle className="text-green-500" size={24} />}
          label="Completed"
          value={stats.completed}
        />
        <StatCard
          icon={<Clock className="text-orange-500" size={24} />}
          label="Pending"
          value={stats.pending}
        />
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="text-lg font-medium">Task Completion Rate</h2>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ 
              width: `${stats.total ? (stats.completed / stats.total) * 100 : 0}%` 
            }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          You've completed {stats.completed} out of {stats.total} tasks
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
