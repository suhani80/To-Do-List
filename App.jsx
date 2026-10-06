import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskflow-tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editingTask, setEditingTask] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);
  const handleAddTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  const handleToggleComplete = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "pending" && !task.completed) ||
      (activeFilter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      <Navbar />

      <div className="page-header">
        {/* <h1></h1> */}
        <p>Manage your tasks easily</p>
      </div>

      <TaskForm
        onAddTask={handleAddTask}
        editingTask={editingTask}
        onUpdateTask={handleUpdateTask}
        onCancelEdit={handleCancelEdit}
      />

      <FilterBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEditTask}
      />
    </div>
  );
}

export default App;