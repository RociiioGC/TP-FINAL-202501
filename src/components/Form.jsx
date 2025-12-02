import { useState } from "react";

function Form({ onAdd }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = value.trim();

    if (!text) {
      setError("Escribí una tarea antes de agregarla.");
      return;
    }

    if (text.length > 100) {
      setError("La tarea es demasiado larga (máx. 100 caracteres).");
      return;
    }

    onAdd(text);
    setValue("");
    setError("");
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    if (error) setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="flex items-start gap-3">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Netflix, gym, lavar la ropa..."
          className="flex-1 border-b-2 border-dashed border-pink-400 bg-transparent
                     text-sm py-1 outline-none"
        />

        <button
          type="submit"
          className="px-3 py-1 text-sm font-semibold rounded-md bg-white shadow-md
                     hover:-translate-y-[1px] hover:shadow-lg transition"
        >
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