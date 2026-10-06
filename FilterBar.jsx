import "./FilterBar.css";

function FilterBar({
  searchTerm,
  onSearch,
  activeFilter,
  onFilterChange,
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="filter-buttons">
        <button
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => onFilterChange("all")}
        >
          All
        </button>

        <button
          className={activeFilter === "pending" ? "active" : ""}
          onClick={() => onFilterChange("pending")}
        >
          Pending
        </button>

        <button
          className={activeFilter === "completed" ? "active" : ""}
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default FilterBar;