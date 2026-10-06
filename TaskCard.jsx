import "./TaskCard.css";

function TaskCard({ task, onDelete, onToggleComplete, onEdit }) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <div className="task-title-row">
          <h3>{task.title}</h3>

          <span
            className={
              task.completed ? "status completed-status" : "status"
            }
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>

        {task.description && <p>{task.description}</p>}
      </div>

      <div className="task-actions">
        <button onClick={() => onToggleComplete(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button className="edit-btn" onClick={() => onEdit(task)}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;