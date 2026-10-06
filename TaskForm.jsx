import { useEffect, useState } from "react";
import "./TaskForm.css";

function TaskForm({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }

    setError("");
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    if (title.trim().length < 3) {
      setError("Task title must be at least 3 characters.");
      return;
    }

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title: title.trim(),
        description: description.trim(),
      });
    } else {
      onAddTask({
        title: title.trim(),
        description: description.trim(),
      });
    }

    setTitle("");
    setDescription("");
    setError("");
  };

  return (
    <div className="task-form-container">
      <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />

        {error && <p className="form-error">{error}</p>}

        <div className="form-buttons">
          <button type="submit">
            {editingTask ? "Update Task" : "+ Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;