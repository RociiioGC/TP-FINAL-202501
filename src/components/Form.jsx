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
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Netflix, gym, lavar la ropa..."
      />
      <button className="todo-add-button" type="submit">
        Agregar
      </button>
    </form>
  );
}

export default Form;