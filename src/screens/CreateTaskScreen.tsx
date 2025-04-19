import { CreateTaskForm } from "../components/CreateTaskForm";

export function CreateTaskScreen() {
  const selectedDate = new Date().toISOString().split('T')[0];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Create Task</h1>
      <div className="card p-6">
        <CreateTaskForm selectedDate={selectedDate} />
      </div>
    </div>
  );
}
