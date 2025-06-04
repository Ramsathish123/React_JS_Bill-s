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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Stack,
  useColorModeValue,
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
      { id: Date.now(), invoiceNo, detail, amount: parseFloat(amount) }
    ]);
    setInvoiceNo('');
    setDetail('');
    setAmount('');
    onClose();
  };

  const handleSearch = () => {
    // You can implement filtering based on fromDate and toDate
    console.log('Searching between:', fromDate, toDate);
  };

  const tableBg = useColorModeValue('white', 'gray.800');

  return (
    <Box p={{ base: 4, md: 8 }} minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Header and Add Button */}
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
        <Heading size="md" fontWeight="semibold" color="blue.600" fontFamily="'Poppins', sans-serif">
          Expense Tracker
        </Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Add Expense
        </Button>
      </Flex>

      {/* Search Filters */}
      <Flex
        gap={4}
        mb={6}
        flexWrap="wrap"
        align="center"
        justify={{ base: 'flex-start', md: 'flex-start' }}
      >
        <Input
          type="date"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
          maxW="200px"
        />
        <Input
          type="date"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
          maxW="200px"
        />
        <Button onClick={handleSearch} colorScheme="teal">
          Search
        </Button>
      </Flex>

      {/* Expense Table */}
      <Box
        bg={tableBg}
        p={4}
        rounded="xl"
        shadow="md"
        overflowX="auto"
      >
        <Table variant="simple" size="md">
          <Thead bg={useColorModeValue('gray.100', 'gray.700')}>
            <Tr>
              <Th>Invoice No</Th>
              <Th>Description</Th>
              <Th isNumeric>Amount (₹)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map(item => (
              <Tr
                key={item.id}
                _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
              >
                <Td>{item.invoiceNo}</Td>
                <Td>{item.detail}</Td>
                <Td isNumeric>₹{item.amount.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {expenses.length === 0 && (
          <Box textAlign="center" py={6} fontStyle="italic" color="gray.500">
            No expenses recorded.
          </Box>
        )}
      </Box>

      {/* Add Expense Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent borderRadius="lg">
          <ModalHeader>Add New Expense</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Invoice No</FormLabel>
                <Input
                  value={invoiceNo}
                  onChange={e => setInvoiceNo(e.target.value)}
                  placeholder="Enter invoice number"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Detail</FormLabel>
                <Input
                  value={detail}
                  onChange={e => setDetail(e.target.value)}
                  placeholder="Enter description"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Amount (₹)</FormLabel>
                <Input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddExpense}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Expense;
