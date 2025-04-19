import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
import { TasksScreen } from "./screens/TasksScreen";
import { CreateTaskScreen } from "./screens/CreateTaskScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { House, Plus, User } from "@phosphor-icons/react";

export default function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    // Request notification permission when the app loads
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold tracking-wide">Memoir</h2>
        <SignOutButton />
      </header>
      
      <main className="flex-1 container max-w-2xl mx-auto p-4">
        <div className="flex flex-col gap-8">
          <Authenticated>
            {activeTab === 'tasks' && <TasksScreen />}
            {activeTab === 'create' && <CreateTaskScreen />}
            {activeTab === 'profile' && <ProfileScreen />}
          </Authenticated>

          <Unauthenticated>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Welcome to Memoir</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Sign in to manage your tasks</p>
              <SignInForm />
            </div>
          </Unauthenticated>
        </div>
      </main>

      <Authenticated>
        <nav className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="container max-w-2xl mx-auto flex justify-around">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex flex-col items-center py-3 px-6 border-t-2 transition-colors ${
                activeTab === 'tasks' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <span className="text-xl mb-1">
                <House weight={activeTab === 'tasks' ? 'fill' : 'regular'} />
              </span>
              <span className="text-xs font-medium">Tasks</span>
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex flex-col items-center py-3 px-6 border-t-2 transition-colors ${
                activeTab === 'create' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <span className="text-xl mb-1">
                <Plus weight={activeTab === 'create' ? 'fill' : 'regular'} />
              </span>
              <span className="text-xs font-medium">Create</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center py-3 px-6 border-t-2 transition-colors ${
                activeTab === 'profile' ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <span className="text-xl mb-1">
                <User weight={activeTab === 'profile' ? 'fill' : 'regular'} />
              </span>
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </nav>
      </Authenticated>

      <Toaster theme="dark" />
    </div>
  );
}
