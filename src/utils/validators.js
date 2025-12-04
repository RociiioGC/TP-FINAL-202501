export function validateTodoText(text) {
    const trimmed = text.trim();
  
    if (!trimmed) {
      return "La tarea no puede estar vacía.";
    }
  
    if (trimmed.length > 100) {
      return "La tarea es demasiado larga (máx. 100 caracteres).";
    }
  
    return null; 
  }