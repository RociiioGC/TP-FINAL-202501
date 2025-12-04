import { useState } from "react";
import {
  Box,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function Form({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <HStack spacing={3}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AddIcon color="purple.400" boxSize={4} />
          </InputLeftElement>

          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Netflix, gym, lavar la ropa..."
            bg="white"
            borderRadius="full"
            pl={10}
            py={5}
            boxShadow="0 8px 22px rgba(148, 94, 255, 0.15)"
            focusBorderColor="purple.400"
          />
        </InputGroup>

        <Button
          type="submit"
          bg="purple.500"
          color="white"
          borderRadius="full"
          px={6}
          h="44px"
          _hover={{ bg: "purple.600", transform: "translateY(-1px)" }}
          _active={{ bg: "purple.700", transform: "translateY(0)" }}
          transition="all 0.15s ease-out"
        >
          Agregar
        </Button>
      </HStack>
    </Box>
  );
}

export default Form;