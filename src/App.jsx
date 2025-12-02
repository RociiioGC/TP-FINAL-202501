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

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.isCompleted;
    if (filter === "pending") return !todo.isCompleted;
    return true;
  });

  const pendingCount = todos.filter((t) => !t.isCompleted).length;

  return (
    <div className="app-wrapper">
      <div className="notebook-card">
        {/* HEADER */}
        <header className="card-header">
          <div className="card-title-pill">To-Do List</div>
          <p className="card-subtitle">Pendientes de hoy ✨</p>
          <p className="card-counter">
            Tenés <strong>{pendingCount}</strong> tarea(s) pendientes
          </p>
        </header>

        {/* FORM */}
        <Form onAdd={handleAdd} />

        {/* FILTRO */}
        <div className="todo-filter-row">
          <span>Ver:</span>
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
      </div>
    </div>
  );
}

export default App;