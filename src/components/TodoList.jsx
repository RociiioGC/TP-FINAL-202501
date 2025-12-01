import { VStack, Text } from "@chakra-ui/react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <Text textAlign="center" color="gray.500" fontSize="sm" mt={4}>
        Todavía no tenés tareas. ¡Agregá una arriba!
      </Text>
    );
  }

  return (
    <VStack align="stretch" spacing={1} mt={4}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </VStack>
  );
}

export default TodoList;