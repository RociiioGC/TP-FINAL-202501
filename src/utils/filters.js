export function filterTodos(todos, filter) {
    if (filter === "completed") {
      return todos.filter((t) => t.isCompleted);
    }
    if (filter === "pending") {
      return todos.filter((t) => !t.isCompleted);
    }
    return todos;
  }
  
  export function countPendingTodos(todos) {
    return todos.filter((t) => !t.isCompleted).length;
  }