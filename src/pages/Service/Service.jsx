import {
  Box, Button, Flex, Heading, Input, Table, Tbody, Td, Th, Thead, Tr,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, ModalCloseButton, FormControl, FormLabel
} from '@chakra-ui/react';
import { useState } from 'react';

const Service = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [serviceNo, setServiceNo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [issue, setIssue] = useState('');
  const [services, setServices] = useState([]);

  const handleAddService = () => {
    setServices(prev => [
      ...prev,
      {
        id: Date.now(),
        serviceNo,
        customerName,
        mobileNumber,
        issue
      }
    ]);
    setServiceNo('');
    setCustomerName('');
    setMobileNumber('');
    setIssue('');
    onClose();
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="md">Service</Heading>
        <Button colorScheme="blue" onClick={onOpen}>Add</Button>
      </Flex>

      <Box overflowX="auto">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Service No</Th>
              <Th>Customer Name</Th>
              <Th>Mobile Number</Th>
              <Th>Issue</Th>
            </Tr>
          </Thead>
          <Tbody>
            {services.map(service => (
              <Tr key={service.id}>
                <Td>{service.serviceNo}</Td>
                <Td>{service.customerName}</Td>
                <Td>{service.mobileNumber}</Td>
                <Td>{service.issue}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Service No</FormLabel>
              <Input value={serviceNo} onChange={e => setServiceNo(e.target.value)} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Customer Name</FormLabel>
              <Input value={customerName} onChange={e => setCustomerName(e.target.value)} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Mobile Number</FormLabel>
              <Input value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Mobile Modal</FormLabel>
              <Input value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Issue</FormLabel>
              <Input value={issue} onChange={e => setIssue(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddService}>Add</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Service;
