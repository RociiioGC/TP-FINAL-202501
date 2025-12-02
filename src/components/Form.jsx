import { useState } from "react";

function Form({ onAdd }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = value.trim();

    if (!text) {
      setError("Escribí una tarea antes de agregarla.");
      return;
    }

    if (text.length > 100) {
      setError("La tarea es demasiado larga.");
      return;
    }

    onAdd(text);
    setValue("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-start gap-3">
        <input
          type="text"
          value={value}
          placeholder="Netflix, gym, lavar la ropa..."
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError("");
          }}
          className="input input-bordered input-secondary w-full text-sm"
        />
        <button type="submit" className="btn btn-primary btn-sm">
          Agregar
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </form>
  );
}

export default Form;