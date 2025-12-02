import { useEffect, useState } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  // 🔹 Estado principal: tareas
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  });

  // 🔹 Filtro: all | pending | completed
  const [filter, setFilter] = useState("all");

  // 🔹 Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      isCompleted: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
  };

  const handleDelete = (id) => {
    const todoToDelete = todos.find((t) => t.id === id);
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar: "${todoToDelete?.text}"?`
    );
    if (!confirmed) return;

    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((t) => t.id === id);
    const newText = window.prompt(
      "Editá tu tarea:",
      todoToEdit ? todoToEdit.text : ""
    );

    if (newText === null) return; // cancel
    const trimmed = newText.trim();
    if (!trimmed) {
      alert("La tarea no puede estar vacía.");
      return;
    }
    if (trimmed.length > 100) {
      alert("La tarea es demasiado larga (máx. 100 caracteres).");
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      )
    );
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.isCompleted;
    if (filter === "pending") return !todo.isCompleted;
    return true; // all
  });

  const pendingCount = todos.filter((t) => !t.isCompleted).length;

  return (
    <div className="min-h-screen bg-purple-300 flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8
                   bg-[radial-gradient(circle,#d4d4d4_1px,transparent_1px)]
                   bg-[length:16px_16px]"
      >
        {/* HEADER */}
        <div className="flex flex-col items-center mb-5">
          <span className="px-6 py-2 rounded-full bg-teal-300 font-bold text-lg shadow-md">
            To-Do List
          </span>

          <p className="text-sm text-gray-700 italic mt-3">
            Pendientes de hoy ✨
          </p>

          <p className="text-sm text-gray-700 mt-2">
            Tenés <b>{pendingCount}</b> tarea(s) pendientes
          </p>
        </div>

        {/* FORMULARIO */}
        <Form onAdd={handleAdd} />

        {/* FILTRO */}
        <div className="flex items-center gap-2 mt-4 text-sm text-gray-700">
          <label htmlFor="filter" className="whitespace-nowrap">
            Ver:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="flex-1 border rounded-md px-2 py-1 text-sm"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
        </div>

        {/* LISTA */}
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default App;