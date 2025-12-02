function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    return (
      <div className="flex justify-between items-center p-3 bg-white shadow rounded-lg mt-2">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => onToggle(todo.id)}
            className="checkbox checkbox-primary"
          />
  
          <p
            className={`text-sm ${
              todo.isCompleted ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.text}
          </p>
        </div>
  
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(todo.id)}
            className="btn btn-xs btn-info"
            aria-label="Editar tarea"
          >
            ✏️
          </button>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            className="btn btn-xs btn-error"
            aria-label="Eliminar tarea"
          >
            🗑️
          </button>
        </div>
      </div>
    );
  }
  
  export default TodoItem;