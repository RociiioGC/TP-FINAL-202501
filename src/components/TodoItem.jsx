function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const textClass = `todo-text${todo.isCompleted ? " completed" : ""}`;

  return (
    <li className="todo-item">
      <div className="todo-left">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggle(todo.id)}
        />
        <span className={textClass}>{todo.text}</span>
      </div>

      <div className="todo-actions">
        <button
          type="button"
          className="icon-button"
          onClick={() => onEdit(todo.id)}
          aria-label="Editar tarea"
        >
          ✏️
        </button>
        <button
          type="button"
          className="icon-button delete"
          onClick={() => onDelete(todo.id)}
          aria-label="Eliminar tarea"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;