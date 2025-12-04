import { useState } from "react";
import Button from "./components/Button";  

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

      <Button type="submit" variant="primary">
        Agregar
      </Button>
    </form>
  );
}

export default Form;