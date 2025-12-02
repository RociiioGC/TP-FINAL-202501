function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-dotted border-gray-200">
      <label className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggle(todo.id)}
          className="w-4 h-4 accent-purple-500"
        />
        <span
          className={`text-sm ${
            todo.isCompleted ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>
      </label>

      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => onEdit(todo.id)}
          className="text-xs px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          aria-label="Editar tarea"
        >
          ✏️
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          className="text-xs px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
          aria-label="Eliminar tarea"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;