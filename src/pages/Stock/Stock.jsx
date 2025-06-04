import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

const Stock = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState({
    productName: '',
    rate: '',
    quantity: '',
    gst: '',
    availableQty: '',
  });

  const [stockList, setStockList] = useState([
    {
      productName: 'Pen',
      rate: '10',
      quantity: '100',
      gst: '5',
      availableQty: '80',
    },
    {
      productName: 'Notebook',
      rate: '50',
      quantity: '200',
      gst: '12',
      availableQty: '150',
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setStockList([...stockList, formData]);
    setFormData({
      productName: '',
      rate: '',
      quantity: '',
      gst: '',
      availableQty: '',
    });
    onClose();
  };

  return (
    <Box p={4}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4} flexWrap="wrap">
        <Heading size="lg">Stock</Heading>
        <Button colorScheme="blue" onClick={onOpen} mt={{ base: 2, md: 0 }}>
          Add Stock
        </Button>
      </Flex>

      {/* Stock Table */}
      <Box overflowX="auto" borderWidth="1px" borderRadius="lg">
        <Table variant="striped" colorScheme="gray" size="md">
          <Thead>
            <Tr>
              <Th>Product Name</Th>
              <Th isNumeric>Rate</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>GST (%)</Th>
              <Th isNumeric>Available Qty</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stockList.map((item, index) => (
              <Tr key={index}>
                <Td>{item.productName}</Td>
                <Td isNumeric>{item.rate}</Td>
                <Td isNumeric>{item.quantity}</Td>
                <Td isNumeric>{item.gst}</Td>
                <Td isNumeric>{item.availableQty}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add Stock Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Stock</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={3}>
              <FormLabel>Product Name</FormLabel>
              <Input name="productName" value={formData.productName} onChange={handleChange} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Rate</FormLabel>
              <Input type="number" name="rate" value={formData.rate} onChange={handleChange} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Quantity</FormLabel>
              <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>GST (%)</FormLabel>
              <Input type="number" name="gst" value={formData.gst} onChange={handleChange} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Available Qty</FormLabel>
              <Input type="number" name="availableQty" value={formData.availableQty} onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </Box>
  );
};

export default Stock;
