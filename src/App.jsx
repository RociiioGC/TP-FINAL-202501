import { useEffect, useState } from "react";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  HStack,
  Select,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";

import Form from "./components/Form";
import TodoList from "./components/TodoList";

import { loadTodos, saveTodos } from "./utils/localStorage";
import { filterTodos, countPendingTodos } from "./utils/filters";
import { validateTodoText } from "./utils/validators";

function App() {
  const [todos, setTodos] = useState(() => loadTodos());
  const [filter, setFilter] = useState("all");

  // modal genérico: alerta / eliminar / editar
  const [modalType, setModalType] = useState(null); // "alert" | "delete" | "edit"
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // ---- Helpers de modal ----
  const openAlertModal = (message, title = "Atención") => {
    setModalType("alert");
    setModalTitle(title);
    setModalMessage(message);
    onOpen();
  };

  const openDeleteModal = (todo) => {
    setModalType("delete");
    setModalTitle("Eliminar tarea");
    setModalMessage(`¿Seguro que querés eliminar: "${todo.text}"?`);
    setSelectedTodoId(todo.id);
    onOpen();
  };

  const openEditModal = (todo) => {
    setModalType("edit");
    setModalTitle("Editar tarea");
    setEditText(todo.text);
    setSelectedTodoId(todo.id);
    onOpen();
  };

  // ---- Handlers de To-Do ----
  const handleAdd = (text) => {
    const error = validateTodoText(text);
    if (error) {
      openAlertModal(error);
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      isCompleted: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDelete = (id) => {
    const todoToDelete = todos.find((t) => t.id === id);
    if (!todoToDelete) return;
    openDeleteModal(todoToDelete);
  };

  const confirmDelete = () => {
    if (!selectedTodoId) return;
    setTodos((prev) => prev.filter((todo) => todo.id !== selectedTodoId));
    setSelectedTodoId(null);
    onClose();
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((t) => t.id === id);
    if (!todoToEdit) return;
    openEditModal(todoToEdit);
  };

  const confirmEdit = () => {
    const text = editText.trim();
    const error = validateTodoText(text);
    if (error) {
      openAlertModal(error);
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === selectedTodoId ? { ...todo, text } : todo
      )
    );
    setSelectedTodoId(null);
    setEditText("");
    onClose();
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = filterTodos(todos, filter);
  const pendingCount = countPendingTodos(todos);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, purple.50, pink.50)"
      py={10}
    >
      <Container maxW="lg">
        <VStack spacing={6} align="stretch">
          {/* HEADER */}
          <VStack spacing={3} textAlign="center">
            <Badge
              bg="pink.100"
              color="purple.700"
              borderRadius="full"
              px={4}
              py={1}
              fontSize="0.9rem"
              boxShadow="0 4px 10px rgba(200, 150, 255, 0.3)"
            >
              ✨ To-Do List ✨
            </Badge>

            <Heading size="lg" color="purple.800">
              Tu lista de tareas
            </Heading>

            <Text fontSize="sm" color="gray.600">
              Tenés{" "}
              <Text as="span" fontWeight="bold" color="purple.700">
                {pendingCount}
              </Text>{" "}
              tarea(s) pendientes.
            </Text>
          </VStack>

          {/* FORM */}
          <Box
            bg="white"
            p={5}
            borderRadius="2xl"
            boxShadow="0 10px 25px rgba(148, 94, 255, 0.2)"
          >
            <Form onAdd={handleAdd} />
          </Box>

          {/* FILTRO */}
          <HStack justify="flex-end" spacing={3}>
            <Text fontSize="sm" color="gray.700">
              Ver:
            </Text>
            <Select
              value={filter}
              onChange={handleFilterChange}
              size="sm"
              maxW="180px"
              borderRadius="full"
              bg="white"
              boxShadow="0 4px 12px rgba(150, 120, 255, 0.2)"
              focusBorderColor="purple.400"
            >
              <option value="all">Todas</option>
              <option value="pending">Pendientes</option>
              <option value="completed">Completadas</option>
            </Select>
          </HStack>

          {/* LISTA */}
          <Box
            bg="white"
            p={5}
            borderRadius="2xl"
            boxShadow="0 10px 25px rgba(148, 94, 255, 0.2)"
          >
            <TodoList
              todos={filteredTodos}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </Box>
        </VStack>

        {/* MODAL CHAKRA */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent
            borderRadius="2xl"
            bg="purple.50"
            boxShadow="0 12px 30px rgba(120, 80, 220, 0.35)"
          >
            <ModalHeader color="purple.800">{modalTitle}</ModalHeader>
            <ModalBody>
              {modalType === "alert" && (
                <Text color="purple.800">{modalMessage}</Text>
              )}

              {modalType === "delete" && (
                <Text color="purple.800">{modalMessage}</Text>
              )}

              {modalType === "edit" && (
                <VStack align="stretch" spacing={3}>
                  <Text color="purple.800">Editá tu tarea:</Text>
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    focusBorderColor="purple.400"
                    bg="white"
                    borderRadius="lg"
                  />
                </VStack>
              )}
            </ModalBody>

            <ModalFooter>
              {modalType === "alert" && (
                <Button
                  colorScheme="purple"
                  borderRadius="full"
                  onClick={onClose}
                >
                  Cerrar
                </Button>
              )}

              {modalType === "delete" && (
                <HStack spacing={3}>
                  <Button
                    variant="ghost"
                    borderRadius="full"
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    colorScheme="red"
                    borderRadius="full"
                    onClick={confirmDelete}
                  >
                    Eliminar
                  </Button>
                </HStack>
              )}

              {modalType === "edit" && (
                <HStack spacing={3}>
                  <Button
                    variant="ghost"
                    borderRadius="full"
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    colorScheme="purple"
                    borderRadius="full"
                    onClick={confirmEdit}
                  >
                    Guardar
                  </Button>
                </HStack>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}

export default App;