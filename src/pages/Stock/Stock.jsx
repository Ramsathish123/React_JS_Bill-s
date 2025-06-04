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
  ModalFooter,
  FormControl,
  FormLabel,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { FiTrash2, FiPlus } from "react-icons/fi";
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

  const [newItem, setNewItem] = useState({
    name: "",
    rate: "",
    qty: "",
    availableQty: "",
  });

  const handleDelete = (id) => {
    setStockItems((items) => items.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    const itemId = `${newItem.name.slice(0, 2).toUpperCase()}${Math.floor(
      Math.random() * 1000
    )}`;
    setStockItems((items) => [
      ...items,
      { ...newItem, id: itemId, rate: Number(newItem.rate), qty: Number(newItem.qty), availableQty: Number(newItem.availableQty) },
    ]);
    setNewItem({ name: "", rate: "", qty: "", availableQty: "" });
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box p={{ base: 4, md: 8 }} minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
        <Heading fontSize={{ base: "md", md: "xl" }} color="blue.600" fontFamily={"'Poppins', sans-serif"}>
          Stock Details
        </Heading>
        <Flex gap={2} flexWrap="wrap">
          <Button colorScheme="gray" variant="outline">
            Export PDF
          </Button>
          <Button colorScheme="blue" variant="solid" onClick={onOpen} leftIcon={<FiPlus />}>
            Add Stock
          </Button>
          <Button colorScheme="blue" variant="ghost">
            Upload
          </Button>
        </Flex>
      </Flex>

      <Flex justify="flex-end" mb={4}>
        <Input
          placeholder="Search product..."
          maxW="250px"
          borderRadius="lg"
          boxShadow="sm"
        />
      </Flex>

      <Box
        bg={bg}
        borderRadius="xl"
        p={4}
        overflowX="auto"
        boxShadow="md"
        w="full"
      >
        <Table variant="simple" size="md">
          <Thead bg={useColorModeValue("gray.100", "gray.700")}>
            <Tr>
              <Th>ID</Th>
              <Th>Product Name</Th>
              <Th isNumeric>Rate (₹)</Th>
              <Th isNumeric>Total Qty</Th>
              <Th isNumeric>Available Qty</Th>
              <Th textAlign="center">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stockItems.map((item) => (
              <Tr
                key={item.id}
                _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
              >
                <Td fontWeight="bold" color="blue.500" whiteSpace="nowrap">
                  {item.id}
                </Td>
                <Td whiteSpace="nowrap">{item.name}</Td>
                <Td isNumeric>₹{item.rate}</Td>
                <Td isNumeric>{item.qty}</Td>
                <Td isNumeric>{item.availableQty}</Td>
                <Td textAlign="center">
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

      {/* Add Stock Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalHeader>Add New Stock Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  name="name"
                  value={newItem.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Rate (₹)</FormLabel>
                <Input
                  type="number"
                  name="rate"
                  value={newItem.rate}
                  onChange={handleChange}
                  placeholder="Enter rate"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Total Quantity</FormLabel>
                <Input
                  type="number"
                  name="qty"
                  value={newItem.qty}
                  onChange={handleChange}
                  placeholder="Enter total quantity"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Available Quantity</FormLabel>
                <Input
                  type="number"
                  name="availableQty"
                  value={newItem.availableQty}
                  onChange={handleChange}
                  placeholder="Enter available quantity"
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAdd}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Stock;
