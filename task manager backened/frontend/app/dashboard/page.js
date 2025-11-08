"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [search, setSearch] = useState(""); // <-- added search state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
        fetchTasks();
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, [router]);

  const fetchTasks = () => {
    axios
      .get("http://localhost:5000/api/tasks", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setTasks(res.data))
      .catch(() => setTasks([]));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setError("");
    if (!newTaskTitle.trim()) {
      setError("Title is required.");
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/tasks",
        { title: newTaskTitle, description: newTaskDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setTasks([res.data, ...tasks]);
        setNewTaskTitle("");
        setNewTaskDescription("");
      })
      .catch(() => setError("Failed to add task."));
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => fetchTasks())
      .catch(() => setError("Failed to delete task."));
  };

  const handleToggleComplete = (task) => {
    axios
      .put(
        `http://localhost:5000/api/tasks/${task._id}`,
        { status: task.status === "complete" ? "incomplete" : "complete" },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => fetchTasks())
      .catch(() => setError("Failed to update task."));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Filtered tasks based on search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (!user) return <p className="p-4 text-center">User not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <form onSubmit={handleAddTask} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="New task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Task
        </button>
      </form>

      {filteredTasks.length === 0 && <p>No matching tasks found.</p>}

      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task._id}
            className={`flex justify-between items-center p-3 mb-2 border rounded ${
              task.status === "complete" ? "bg-green-100 line-through" : "bg-white"
            }`}
          >
            <div>
              <h3 className="font-bold text-black">{task.title}</h3>
              {task.description && <p className="text-gray-600">{task.description}</p>}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleToggleComplete(task)}
                className={`px-3 py-1 rounded ${
                  task.status === "complete" ? "bg-yellow-400" : "bg-green-500 text-white"
                }`}
              >
                {task.status === "complete" ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
