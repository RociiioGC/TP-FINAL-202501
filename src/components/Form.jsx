import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  HStack,
} from "@chakra-ui/react";

function Form({ onAdd }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = value.trim();

    if (!text) {
      setError("Escribí una tarea antes de agregarla.");
      return;
    }

    if (text.length > 100) {
      setError("La tarea es demasiado larga.");
      return;
    }

    onAdd(text);
    setValue("");
    setError("");
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl isInvalid={Boolean(error)}>
        <HStack spacing={3}>
          <Input
            value={value}
            placeholder="Netflix…"
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError("");
            }}
            variant="unstyled"
            borderBottom="2px dashed #f472d0"
            pb={1}
            fontSize="sm"
          />

          <Button
            type="submit"
            size="sm"
            variant="outline"
            borderRadius="md"
            bg="white"
            boxShadow="md"
          >
            Agregar
          </Button>
        </HStack>

        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Box>
  );
}

export default Form;