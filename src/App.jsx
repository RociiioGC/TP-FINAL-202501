import { useEffect, useState } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

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

    if (newText === null) return;
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
    return true;
  });

  const pendingCount = todos.filter((t) => !t.isCompleted).length;

  return (
    <div className="min-h-screen bg-[#c9b4f9] flex items-center justify-center px-4 py-10 font-['Kalam']">
      {/* 📒 Tarjeta cuaderno */}
      <div
        className="bg-[#fdfefe] rounded-[32px] shadow-2xl border border-gray-200
                   bg-[radial-gradient(circle,#d4d4d4_1px,transparent_1px)]
                   bg-[length:16px_16px] px-10 py-8"
        style={{ width: "460px", maxWidth: "100%", minHeight: "520px" }}
      >
        {/* Usamos flex-col para repartir header y contenido */}
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="flex flex-col items-center mb-4">
            <span className="px-6 py-2 rounded-full bg-[#3af5c3] font-bold text-lg shadow-md">
              To-Do List
            </span>

            <p className="text-sm text-gray-700 italic mt-4">
              Pendientes de hoy ✨
            </p>

            <p className="text-xs sm:text-sm text-gray-700 mt-2 text-center">
              Tenés <b>{pendingCount}</b> tarea(s) pendientes
            </p>
          </div>

          {/* 💜 Bloque central: formulario + filtro + lista
              lo centramos verticalmente en el espacio que queda */}
          <div className="flex flex-col gap-4 flex-1 justify-center">
            <Form onAdd={handleAdd} />

            <div className="flex items-center justify-end gap-2 text-xs sm:text-sm text-gray-700">
              <label htmlFor="filter" className="whitespace-nowrap">
                Ver:
              </label>
              <select
                id="filter"
                value={filter}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md px-2 py-1 text-xs bg-white"
              >
                <option value="all">Todas</option>
                <option value="pending">Pendientes</option>
                <option value="completed">Completadas</option>
              </select>
            </div>

            <TodoList
              todos={filteredTodos}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
