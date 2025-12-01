import { EditIcon } from "@chakra-ui/icons";
import { DeleteIcon } from "@chakra-ui/icons";

import {
    HStack,
    Text,
    IconButton,
    Checkbox,
    Box,
  } from "@chakra-ui/react";
  import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
  
  function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    return (
      <Box
        bg="white"
        borderRadius="lg"
        p={3}
        my={2}
        boxShadow="sm"
        border="1px solid #eee"
      >
        <HStack justify="space-between">
          <HStack spacing={3}>
            <Checkbox
              isChecked={todo.isCompleted}
              colorScheme="purple"
              onChange={() => onToggle(todo.id)}
            />
  
            <Text
              fontSize="sm"
              textDecoration={todo.isCompleted ? "line-through" : "none"}
              color={todo.isCompleted ? "gray.400" : "gray.800"}
            >
              {todo.text}
            </Text>
          </HStack>
  
          <HStack spacing={2}>
            <IconButton
              size="sm"
              aria-label="Edit"
              icon={<EditIcon />}
              colorScheme="blue"
              variant="solid"
              onClick={() => onEdit(todo.id)}
            />
  
            <IconButton
              size="sm"
              aria-label="Delete"
              icon={<DeleteIcon />}
              colorScheme="red"
              variant="solid"
              onClick={() => onDelete(todo.id)}
            />
          </HStack>
        </HStack>
      </Box>
    );
  }
  
  export default TodoItem;