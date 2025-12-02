function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <li className={`todo-item ${todo.isCompleted ? "is-completed" : ""}`}>
      <label className="todo-item-left">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.text}</span>
      </label>

      <div className="todo-item-actions">
        <button
          type="button"
          className="todo-icon-button"
          aria-label="Editar tarea"
          onClick={() => onEdit(todo.id)}
        >
          ✏️
        </button>
        <button
          type="button"
          className="todo-icon-button"
          aria-label="Eliminar tarea"
          onClick={() => onDelete(todo.id)}
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;