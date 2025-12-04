import { useEffect, useState } from "react";
import {
  Box,
  Container,
  VStack,
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

  const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

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
    <Box minH="100vh" bgGradient="linear(to-b, purple.50, pink.50)" py={10}>
      <Container maxW="lg">
        {/* CARD PRINCIPAL */}
        <Box
          bg="rgba(255,255,255,0.9)"
          p={8}
          borderRadius="3xl"
          boxShadow="0 24px 60px rgba(148, 94, 255, 0.3)"
          backdropFilter="blur(22px)"
          border="1px solid rgba(255,255,255,0.8)"
        >
          <VStack spacing={8} align="stretch">
            {/* HEADER */}
            <VStack spacing={4} textAlign="center" mt={-2}>
              <Badge
                bg="pink.50"
                color="purple.600"
                borderRadius="full"
                px={6}
                py={2}
                fontSize="1.4rem"
                fontWeight="bold"
                boxShadow="0 6px 15px rgba(200, 150, 255, 0.3)"
                letterSpacing="0.5px"
              >
                ✨ TO-DO LIST ✨
              </Badge>

              <Text fontSize="sm" color="gray.600">
                Tenés{" "}
                <Text as="span" fontWeight="bold" color="purple.700">
                  {pendingCount}
                </Text>{" "}
                tarea(s) pendientes.
              </Text>
            </VStack>

            {/* FORM */}
            <Form onAdd={handleAdd} />

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

            {/* LISTA DENTRO DE LA MISMA CARD */}
            <VStack spacing={3} mt={2} align="stretch">
              <TodoList
                todos={filteredTodos}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </VStack>
          </VStack>
        </Box>

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