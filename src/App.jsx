import { useState } from "react";
import {
  Box,
  Container,
  VStack,
  Text,
  Tag,
  useToast,
} from "@chakra-ui/react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const toast = useToast();

  const handleAdd = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      isCompleted: false,
    };
    setTodos([newTodo, ...todos]);

    toast({
      title: "Tarea agregada.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));

    toast({
      title: "Tarea eliminada.",
      status: "warning",
      duration: 2000,
      position: "top",
    });
  };

  const handleEdit = (id) => {
    const newText = prompt("Editá tu tarea:");
    if (!newText) return;

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );

    toast({
      title: "Tarea editada.",
      status: "info",
      duration: 2000,
      position: "top",
    });
  };

  return (
    <Box minH="100vh" bg="#c9b4f9" py={10}>
      <Container maxW="sm">
        <Box
          bg="#fdfefe"
          borderRadius="3xl"
          p={8}
          boxShadow="xl"
          bgImage="radial-gradient(circle, #d4d4d4 1px, transparent 1px)"
          bgSize="16px 16px"
        >
          <VStack spacing={3} mb={4}>
            <Tag
              bg="#3af5c3"
              color="black"
              px={6}
              py={3}
              borderRadius="full"
              fontWeight="700"
              fontSize="lg"
              boxShadow="md"
            >
              To-Do List
            </Tag>

            <Text fontSize="sm" color="gray.700" fontStyle="italic">
              Pendientes de hoy ✨
            </Text>

            <Text fontSize="sm" color="gray.600" mt={2}>
              Tenés <b>{todos.filter(t => !t.isCompleted).length}</b> tarea(s) pendientes
            </Text>
          </VStack>

          <Form onAdd={handleAdd} />

          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default App;