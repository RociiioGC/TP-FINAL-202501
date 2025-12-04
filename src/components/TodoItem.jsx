import { HStack, Checkbox, Text, IconButton, Badge } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <HStack
      as="li"
      spacing={3}
      py={3}
      px={4}
      borderRadius="xl"
      bg={todo.isCompleted ? "purple.50" : "white"}
      boxShadow="0 8px 18px rgba(148, 94, 255, 0.12)"
      borderWidth="1px"
      borderColor={todo.isCompleted ? "purple.100" : "white"}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "0 12px 28px rgba(148, 94, 255, 0.22)",
        bg: todo.isCompleted ? "purple.50" : "pink.50",
      }}
      justify="space-between"
      transition="all 0.15s ease-out"
    >
      <HStack spacing={3}>
        <Checkbox
          isChecked={todo.isCompleted}
          onChange={() => onToggle(todo.id)}
          colorScheme="purple"
          size="lg"
        />

        <Text
          as={todo.isCompleted ? "s" : "span"}
          fontSize="md"
          color={todo.isCompleted ? "gray.400" : "gray.800"}
        >
          {todo.text}
        </Text>

        {todo.isCompleted && (
          <Badge
            colorScheme="purple"
            variant="subtle"
            borderRadius="full"
            fontSize="0.6rem"
          >
            ✓ listo
          </Badge>
        )}
      </HStack>

      <HStack spacing={1}>
        <IconButton
          aria-label="Editar tarea"
          icon={<EditIcon />}
          size="sm"
          variant="ghost"
          color="purple.500"
          _hover={{ bg: "purple.50" }}
          onClick={() => onEdit(todo.id)}
        />
        <IconButton
          aria-label="Eliminar tarea"
          icon={<DeleteIcon />}
          size="sm"
          variant="ghost"
          color="red.400"
          _hover={{ bg: "pink.50" }}
          onClick={() => onDelete(todo.id)}
        />
      </HStack>
    </HStack>
  );
}

export default TodoItem;