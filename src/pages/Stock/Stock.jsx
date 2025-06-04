import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";

const Stock = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stockItems, setStockItems] = useState([
    {
      id: "AB100",
      name: "Avarampoo Bath Powder - 100gms",
      rate: 120,
      qty: 1000,
      availableQty: 1000,
    },
    {
      id: "AB200",
      name: "Avarampoo Bath Powder - 200gms",
      rate: 270,
      qty: 1000,
      availableQty: 891,
    },
    {
      id: "AO100",
      name: "Almond Oil (100ml)",
      rate: 540,
      qty: 100,
      availableQty: 65,
    },
  ]);

  const handleDelete = (id) => {
    setStockItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <Box p={4} w="100%">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Stock Details</Heading>
        <Flex gap={2}>
          <Button colorScheme="gray">PDF</Button>
          <Button colorScheme="blue" onClick={onOpen}>
            Add
          </Button>
          <Button colorScheme="blue">Upload</Button>
        </Flex>
      </Flex>

      <Flex justify="flex-end" mb={3}>
        <Input placeholder="Search..." maxW="250px" />
      </Flex>

      <Box overflowX="auto">
        <Table variant="striped" colorScheme="gray">
          <Thead bg="gray.100">
            <Tr>
              <Th>ProductID</Th>
              <Th>ProductName</Th>
              <Th>Rate</Th>
              <Th>Quantity</Th>
              <Th>Available Quantity</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stockItems.map((item) => (
              <Tr key={item.id}>
                <Td
                  color="blue.500"
                  textDecoration="underline"
                  cursor="pointer"
                >
                  {item.id}
                </Td>
                <Td>{item.name}</Td>
                <Td>{item.rate}</Td>
                <Td>{item.qty}</Td>
                <Td>{item.availableQty}</Td>
                <Td>
                  <IconButton
                    icon={<FiTrash2 />}
                    aria-label="Delete"
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal for Add Stock */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Stock</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Product Name</FormLabel>
              <Input />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Rate</FormLabel>
              <Input type="number" />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Quantity</FormLabel>
              <Input type="number" />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>GST (%)</FormLabel>
              <Input type="number" />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Available Quantity</FormLabel>
              <Input type="number" />
            </FormControl>
            <Button colorScheme="blue" mt={4} w="full" onClick={onClose}>
              Save
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Stock;
