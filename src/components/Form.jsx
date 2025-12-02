import { useState } from "react";

function Form({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="todo-input-wrapper">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Netflix, gym, lavar la ropa..."
          className="todo-input"
        />
        <div className="todo-input-underline" />
      </div>

      <button type="submit" className="add-button">
        Agregar
      </button>
    </form>
  );
}

export default Form;