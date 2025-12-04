import { HStack, Checkbox, Text, IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <HStack
      as="li"
      spacing={3}
      py={2}
      px={3}
      borderRadius="md"
      bg={todo.isCompleted ? "gray.50" : "white"}
      borderWidth="1px"
      borderColor={todo.isCompleted ? "gray.200" : "gray.100"}
      _hover={{ boxShadow: "sm", bg: "gray.50" }}
      justify="space-between"
    >
      <HStack>
        <Checkbox
          isChecked={todo.isCompleted}
          onChange={() => onToggle(todo.id)}
          colorScheme="purple"
        />
        <Text
          as={todo.isCompleted ? "s" : "span"}
          color={todo.isCompleted ? "gray.500" : "gray.800"}
        >
          {todo.text}
        </Text>
      </HStack>

      <HStack spacing={1}>
        <IconButton
          aria-label="Editar tarea"
          icon={<EditIcon />}
          size="sm"
          variant="ghost"
          colorScheme="purple"
          onClick={() => onEdit(todo.id)}
        />
        <IconButton
          aria-label="Eliminar tarea"
          icon={<DeleteIcon />}
          size="sm"
          variant="ghost"
          colorScheme="red"
          onClick={() => onDelete(todo.id)}
        />
      </HStack>
    </HStack>
  );
}

export default TodoItem;