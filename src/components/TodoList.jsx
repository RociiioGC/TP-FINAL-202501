import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500 text-sm mt-4">
        Todavía no tenés tareas. ¡Agregá una arriba!
      </p>
    );
  }

  return (
    <div className="mt-2 space-y-1">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;