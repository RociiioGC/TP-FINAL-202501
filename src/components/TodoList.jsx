import { VStack, Text } from "@chakra-ui/react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <Text
        textAlign="center"
        color="gray.500"
        fontSize="sm"
        mt={2}
      >
        Todavía no tenés tareas. ¡Agregá una arriba! ✨
      </Text>
    );
  }

  return (
    <VStack
      as="ul"
      align="stretch"
      spacing={2}
      m={0}
      p={0}
      listStyleType="none"
    >
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