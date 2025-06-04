import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, IconButton, VStack, HStack, Text
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

    // Autofill from DB
    if (field === "productId" && productDB[value]) {
      updated[index].productName = productDB[value].name;
      updated[index].rate = productDB[value].rate;
    }

    // Amount calculation
    const rate = parseFloat(updated[index].rate);
    const quantity = parseFloat(updated[index].quantity);
    if (!isNaN(rate) && !isNaN(quantity)) {
      updated[index].amount = rate * quantity;
    }

    setRows(updated);

    // Focus quantity if productId is filled
    if (field === "productId" && productDB[value]) {
      setTimeout(() => quantityRefs.current[index]?.focus(), 0);
    }

    // Move to next row's productId if quantity entered
    if (field === "quantity" && value) {
      // Add new row if at last index
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

  return (
    <Box p={6}>
      <Box fontSize="xl" mb={4} fontWeight="bold">
        Create Invoice
      </Box>

      <Table variant="simple" size="sm">
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
                />
              </Td>
              <Td>
                <Input value={row.productName} isReadOnly />
              </Td>
              <Td>
                <Input value={row.rate} isReadOnly />
              </Td>
              <Td>
                <Input
                  ref={(el) => (quantityRefs.current[index] = el)}
                  value={row.quantity}
                  onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                  placeholder="Qty"
                />
              </Td>
              <Td>
                <Input value={row.amount} isReadOnly />
              </Td>
              <Td>
                <IconButton
                  icon={<FiTrash2 />}
                  onClick={() => handleRemove(index)}
                  size="sm"
                  aria-label="Remove row"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <HStack justify="flex-end" mt={4}>
        <Text fontWeight="bold">Total: ₹{totalAmount.toFixed(2)}</Text>
      </HStack>

      <VStack align="end" mt={4}>
        <Button colorScheme="blue">Save Invoice</Button>
      </VStack>
    </Box>
  );
};

export default Invoice;
