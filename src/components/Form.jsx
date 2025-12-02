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
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 px-2">
      {/* INPUT + BOTÓN */}
      <div className="flex items-center gap-3">
        <input
          className="
            w-full bg-transparent outline-none
            border-b-2 border-dashed border-[#e29be6]
            pb-1 text-sm
            placeholder:text-gray-500
          "
          placeholder="Netflix, gym, lavar la ropa..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError("");
          }}
        />

        <button
          type="submit"
          className="
            text-xs bg-white border border-gray-300 rounded-md
            px-3 py-1 shadow-sm hover:shadow-md transition
          "
        >
          Agregar
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </form>
  );
}

export default Form;