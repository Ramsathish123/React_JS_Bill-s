import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  IconButton,
  VStack,
  HStack,
  Text,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

// Mock DB
const productDB = {
  P100: { name: "Avarampoo Powder", rate: 120 },
  P200: { name: "Almond Oil", rate: 190 },
  P300: { name: "Bamboo Brush", rate: 50 },
};

const Invoice = () => {
  const [rows, setRows] = useState([
    { id: 1, productId: "", productName: "", rate: "", quantity: "", amount: "" },
  ]);

  const productRefs = useRef([]);
  const quantityRefs = useRef([]);

  useEffect(() => {
    productRefs.current = productRefs.current.slice(0, rows.length);
    quantityRefs.current = quantityRefs.current.slice(0, rows.length);
  }, [rows]);

  const handleInputChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;

    if (field === "productId" && productDB[value]) {
      updated[index].productName = productDB[value].name;
      updated[index].rate = productDB[value].rate;
    }

    const rate = parseFloat(updated[index].rate);
    const quantity = parseFloat(updated[index].quantity);
    if (!isNaN(rate) && !isNaN(quantity)) {
      updated[index].amount = rate * quantity;
    }

    setRows(updated);

    if (field === "productId" && productDB[value]) {
      setTimeout(() => quantityRefs.current[index]?.focus(), 0);
    }

    if (field === "quantity" && value) {
      if (index === rows.length - 1) {
        setRows([
          ...updated,
          {
            id: rows.length + 1,
            productId: "",
            productName: "",
            rate: "",
            quantity: "",
            amount: "",
          },
        ]);
        setTimeout(() => productRefs.current[index + 1]?.focus(), 0);
      } else {
        setTimeout(() => productRefs.current[index + 1]?.focus(), 0);
      }
    }
  };

  const handleRemove = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated.length ? updated : [{ id: 1, productId: "", productName: "", rate: "", quantity: "", amount: "" }]);
  };

  const totalAmount = rows.reduce((sum, row) => sum + Number(row.amount || 0), 0);

  const bgCard = useColorModeValue("white", "gray.800");
  const borderCard = useColorModeValue("gray.200", "gray.700");

  return (
    <Box p={[4, 6]} w="full">
      <Box
        maxW="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={bgCard}
        borderColor={borderCard}
        p={[4, 6]}
        boxShadow="md"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Create Invoice
        </Text>

        <Box overflowX="auto">
          <Table variant="striped" size="sm" colorScheme="gray">
            <Thead bg="gray.100">
              <Tr>
                <Th>Product ID</Th>
                <Th>Product Name</Th>
                <Th>Rate</Th>
                <Th>Quantity</Th>
                <Th>Amount</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((row, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      ref={(el) => (productRefs.current[index] = el)}
                      value={row.productId}
                      onChange={(e) => handleInputChange(index, "productId", e.target.value)}
                      placeholder="Enter ID"
                      size="sm"
                    />
                  </Td>
                  <Td>
                    <Input value={row.productName} isReadOnly size="sm" />
                  </Td>
                  <Td>
                    <Input value={row.rate} isReadOnly size="sm" />
                  </Td>
                  <Td>
                    <Input
                      ref={(el) => (quantityRefs.current[index] = el)}
                      value={row.quantity}
                      onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                      placeholder="Qty"
                      size="sm"
                    />
                  </Td>
                  <Td>
                    <Input value={row.amount} isReadOnly size="sm" />
                  </Td>
                  <Td>
                    <IconButton
                      icon={<FiTrash2 />}
                      onClick={() => handleRemove(index)}
                      size="sm"
                      aria-label="Remove row"
                      colorScheme="red"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Flex justify="space-between" mt={6} flexWrap="wrap" gap={4}>
          <Text fontSize="lg" fontWeight="semibold">
            Total: ₹{totalAmount.toFixed(2)}
          </Text>
          <Button colorScheme="blue" px={6}>
            Save Invoice
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Invoice;
