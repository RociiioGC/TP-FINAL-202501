import { useState } from "react";
import { Box, VStack, Input, Button } from "@chakra-ui/react";

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
      <VStack align="stretch" spacing={3}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Netflix, gym, lavar la ropa..."
          variant="flushed"            
          focusBorderColor="purple.400"
        />

        <Button
          type="submit"
          colorScheme="purple"
          alignSelf="flex-end"
          size="sm"
        >
          Agregar
        </Button>
      </VStack>
    </Box>
  );
}

export default Form;