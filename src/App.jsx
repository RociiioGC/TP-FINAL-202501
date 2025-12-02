import { useEffect, useState } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { loadTodos, saveTodos } from "./utils/localStorage";
import { filterTodos, countPendingTodos } from "./utils/filters";
import { validateTodoText } from "./utils/validators";

function App() {
  const [todos, setTodos] = useState(() => loadTodos());
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAdd = (text) => {
    const error = validateTodoText(text);
    if (error) {
      alert(error);
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      text: text.trim(),
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

    const error = validateTodoText(newText);
    if (error) {
      alert(error);
      return;
    }

    const trimmed = newText.trim();

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      )
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = filterTodos(todos, filter);
  const pendingCount = countPendingTodos(todos);

  return (
    <div className="app-wrapper">
      <div className="todo-card">
        {/* HEADER */}
        <header className="todo-header">
          <div className="todo-title-row">
            {/* ⭐ izquierda */}
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

            <div className="todo-title-badge">To-Do List</div>

            {/* ⭐ derecha */}
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
          <Form onAdd={handleAdd} />

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