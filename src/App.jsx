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
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.isCompleted;
    if (filter === "pending") return !todo.isCompleted;
    return true;
  });

  const pendingCount = todos.filter((t) => !t.isCompleted).length;

  return (
    <div className="app-wrapper">
      <div className="todo-card">
        {/* HEADER */}
        <header className="todo-header">
          <div className="todo-title-row">
            {/* ⭐ Izquierda */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="title-star"
              style={{ animationDelay: "0.15s" }}
            >
              <path
                d="M32 6 L38 22 L56 24 L42 34 L46 52 L32 42 L18 52 L22 34 L8 24 L26 22 Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Título */}
            <div className="todo-title-badge">To-Do List</div>

            {/* ⭐ Derecha */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="title-star"
              style={{ animationDelay: "0.3s" }}
            >
              <path
                d="M32 6 L38 22 L56 24 L42 34 L46 52 L32 42 L18 52 L22 34 L8 24 L26 22 Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <p className="todo-counter">
            Tenés <span>{pendingCount}</span> tarea(s) pendientes
          </p>
        </header>

        {/* MAIN */}
        <main className="todo-main">
          {/* FORM */}
          <Form onAdd={handleAdd} />

          {/* FILTRO */}
          <div className="todo-filter-row">
            <span className="todo-filter-label">Ver:</span>
            <select
              value={filter}
              onChange={handleFilterChange}
              className="todo-filter-select"
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
        </main>
      </div>
    </div>
  );
}

export default App;