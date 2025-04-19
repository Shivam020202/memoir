import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { TaskList } from "../components/TaskList";
import { Calendar, ListChecks } from "@phosphor-icons/react";
import { useState } from "react";

export function TasksScreen() {
  const [view, setView] = useState<'calendar' | 'list'>('list');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Tasks</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg transition-colors ${
              view === 'list' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <ListChecks size={24} />
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`p-2 rounded-lg transition-colors ${
              view === 'calendar' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Calendar size={24} />
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="card p-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field mb-4"
          />
          <TaskList selectedDate={selectedDate} />
        </div>
      ) : (
        <TaskGroups />
      )}
    </div>
  );
}

function TaskGroups() {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  
  return (
    <div className="space-y-6">
      <TaskGroup title="Today" date={today} />
      <TaskGroup title="Tomorrow" date={tomorrow} />
      <TaskGroup title="Upcoming" date={tomorrow} showUpcoming />
    </div>
  );
}

function TaskGroup({ title, date, showUpcoming = false }: { 
  title: string;
  date: string;
  showUpcoming?: boolean;
}) {
  const tasks = useQuery(api.tasks.getTasks, { date }) || [];
  
  if (!showUpcoming && tasks.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h2>
      <TaskList selectedDate={date} />
    </div>
  );
}
