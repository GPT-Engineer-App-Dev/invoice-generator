import { useState } from 'react';
import {
  Container, VStack, Input, Button, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, SimpleGrid, Box, Heading
} from "@chakra-ui/react";

const Index = () => {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const handleAddItem = () => {
    const newItem = { description, quantity, price, total: quantity * price };
    setItems([...items, newItem]);
    setDescription('');
    setQuantity(1);
    setPrice(0);
    updateTotal(newItem.total);
  };

  const updateTotal = (itemTotal) => {
    setTotal(prevTotal => prevTotal + itemTotal);
  };

  const handleGenerateInvoice = () => {
    alert(`Total Invoice Amount: $${total}\n\nItems:\n${items.map(item => `${item.description} - Quantity: ${item.quantity}, Price: $${item.price}, Total: $${item.total}`).join('\n')}`);
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading>Invoice Generator</Heading>
        <SimpleGrid columns={2} spacing={10} w="full">
          <Box>
            <Text mb={2}>Description:</Text>
            <Input placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Box>
          <Box>
            <Text mb={2}>Quantity:</Text>
            <NumberInput min={1} value={quantity} onChange={(valueString) => setQuantity(parseInt(valueString))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box>
            <Text mb={2}>Price ($):</Text>
            <Input placeholder="Enter price" type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
          </Box>
          <Box>
            <Button colorScheme="blue" onClick={handleAddItem}>Add Item</Button>
          </Box>
        </SimpleGrid>
        <VStack spacing={4} align="stretch" w="full">
          {items.map((item, index) => (
            <Text key={index}>{item.description} - Quantity: {item.quantity}, Price: ${item.price}, Total: ${item.total}</Text>
          ))}
        </VStack>
        <Button colorScheme="green" onClick={handleGenerateInvoice}>Generate Invoice</Button>
        <Text fontSize="xl">Total: ${total}</Text>
      </VStack>
    </Container>
  );
};

export default Index;