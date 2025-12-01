import { Box, Container, VStack, Text, Tag } from "@chakra-ui/react";

function App() {
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

            <Text fontSize="sm" color="gray.700">
              ~ Hoy tengo que hacer ~
            </Text>

            {/* CONTADOR DE TAREAS */}
            <Text fontSize="sm" color="gray.600" mt={2}>
              You have <b>3</b> task(s) to complete
            </Text>
          </VStack>

          {/* ACÁ AGREGAR EL FORM Y LA LISTA */}
          <Box mt={6}>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              (Aquí va la lista de tareas con iconos)
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;