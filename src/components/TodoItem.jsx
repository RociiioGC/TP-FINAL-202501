function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <div className="flex items-center justify-between py-1">
      {/* Bullet + texto */}
      <label className="flex items-center gap-2 flex-1 cursor-pointer">
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

      {/* Iconos a la derecha */}
      <div className="flex gap-2 ml-2">
        <button
          type="button"
          onClick={() => onEdit(todo.id)}
          className="w-7 h-7 flex items-center justify-center rounded-md bg-blue-500 text-white text-xs hover:bg-blue-600"
          aria-label="Editar tarea"
        >
          ✏️
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          className="w-7 h-7 flex items-center justify-center rounded-md bg-red-500 text-white text-xs hover:bg-red-600"
          aria-label="Eliminar tarea"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;