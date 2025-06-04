import {
  Box, Button, Flex, Heading, Input, Table, Tbody, Td, Th, Thead, Tr,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel
} from '@chakra-ui/react';
import { useState } from 'react';

const Expense = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [invoiceNo, setInvoiceNo] = useState('');
  const [detail, setDetail] = useState('');
  const [amount, setAmount] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = () => {
    setExpenses(prev => [
      ...prev,
      { id: Date.now(), invoiceNo, detail, amount }
    ]);
    setInvoiceNo('');
    setDetail('');
    setAmount('');
    onClose();
  };

  const handleSearch = () => {
    // You can apply date-range filtering logic here if needed.
    console.log('Searching between:', fromDate, toDate);
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Expense</Heading>
        <Button colorScheme="blue" onClick={onOpen}>Add</Button>
      </Flex>

      <Flex gap={4} mb={4} flexWrap="wrap">
        <Input
          type="date"
          placeholder="From Date"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
          maxW="200px"
        />
        <Input
          type="date"
          placeholder="To Date"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
          maxW="200px"
        />
        <Button onClick={handleSearch} colorScheme="teal">Search</Button>
      </Flex>

      <Box overflowX="auto">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Invoice No</Th>
              <Th>Detail</Th>
              <Th isNumeric>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map(item => (
              <Tr key={item.id}>
                <Td>{item.invoiceNo}</Td>
                <Td>{item.detail}</Td>
                <Td isNumeric>₹{item.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Invoice No</FormLabel>
              <Input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Detail</FormLabel>
              <Input value={detail} onChange={e => setDetail(e.target.value)} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Amount</FormLabel>
              <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddExpense}>Add</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Expense;
