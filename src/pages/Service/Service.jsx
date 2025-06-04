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
  useBreakpointValue,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Avatar,
  Text,
  Tag,
  TagLabel,
  useColorModeValue,
  SimpleGrid
} from "@chakra-ui/react";
import { useState } from "react";
import { FiPlus, FiPhone, FiUser, FiSmartphone, FiAlertCircle } from "react-icons/fi";

const Service = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    serviceNo: "",
    customerName: "",
    mobileNumber: "",
    mobileModel: "",
    issue: "",
    status: "Pending",
  });
  const [services, setServices] = useState([
    {
      id: 1,
      serviceNo: "SRV-001",
      customerName: "John Doe",
      mobileModel: "iPhone 14 Pro",
      mobileNumber: "9876543210",
      issue: "Screen replacement",
      status: "In Progress",
    },
    {
      id: 2,
      serviceNo: "SRV-002",
      customerName: "Jane Smith",
      mobileModel: "Samsung S23",
      mobileNumber: "8765432109",
      issue: "Battery issue",
      status: "Completed",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddService = () => {
    setServices((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...formData,
      },
    ]);
    setFormData({
      serviceNo: "",
      customerName: "",
      mobileNumber: "",
      mobileModel: "",
      issue: "",
      status: "Pending",
    });
    onClose();
  };

  const modalSize = useBreakpointValue({ base: "full", md: "lg" });
  const cardBg = useColorModeValue("white", "gray.700");
  const tableBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.600");

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "In Progress":
        return "blue";
      default:
        return "orange";
    }
  };

  return (
    <Box p={{ base: 4, md: 6 }} bg={useColorModeValue("gray.50", "gray.900")} minH="100vh">
      <Flex justify="space-between" align="center" mb={8}>
        <Heading size="xl" fontWeight="semibold" color="blue.600">
          Device Services
        </Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          onClick={onOpen}
          size="md"
          variant="solid"
          px={6}
        >
          New Service
        </Button>
      </Flex>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={8}>
        <Card bg={cardBg} borderRadius="xl" boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Flex align="center">
              <Avatar icon={<FiPhone />} bg="blue.100" color="blue.600" mr={4} />
              <Box>
                <Text color="gray.500" fontSize="sm">Total Services</Text>
                <Heading size="lg">{services.length}</Heading>
              </Box>
            </Flex>
          </CardBody>
        </Card>

        <Card bg={cardBg} borderRadius="xl" boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Flex align="center">
              <Avatar icon={<FiAlertCircle />} bg="orange.100" color="orange.600" mr={4} />
              <Box>
                <Text color="gray.500" fontSize="sm">Pending</Text>
                <Heading size="lg">
                  {services.filter(s => s.status === "Pending").length}
                </Heading>
              </Box>
            </Flex>
          </CardBody>
        </Card>

        <Card bg={cardBg} borderRadius="xl" boxShadow="sm" borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <Flex align="center">
              <Avatar icon={<FiSmartphone />} bg="green.100" color="green.600" mr={4} />
              <Box>
                <Text color="gray.500" fontSize="sm">Completed</Text>
                <Heading size="lg">
                  {services.filter(s => s.status === "Completed").length}
                </Heading>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Services Table */}
      <Card bg={tableBg} borderRadius="xl" boxShadow="sm" borderWidth="1px" borderColor={borderColor} overflow="hidden">
        <CardHeader borderBottomWidth="1px" borderColor={borderColor}>
          <Heading size="md">Recent Service Requests</Heading>
        </CardHeader>
        <CardBody px={0}>
          <Box overflowX="auto">
            <Table variant="simple" size="md">
              <Thead bg={useColorModeValue("blue.50", "blue.900")}>
                <Tr>
                  <Th>Service No</Th>
                  <Th>Customer</Th>
                  <Th>Device</Th>
                  <Th>Contact</Th>
                  <Th>Issue</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {services.map((service) => (
                  <Tr key={service.id} _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}>
                    <Td fontWeight="600">{service.serviceNo}</Td>
                    <Td>
                      <Flex align="center">
                        <Avatar name={service.customerName} size="sm" mr={2} />
                        {service.customerName}
                      </Flex>
                    </Td>
                    <Td>{service.mobileModel}</Td>
                    <Td>{service.mobileNumber}</Td>
                    <Td maxW="200px" isTruncated>{service.issue}</Td>
                    <Td>
                      <Tag colorScheme={getStatusColor(service.status)} size="md" borderRadius="full">
                        <TagLabel>{service.status}</TagLabel>
                      </Tag>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
      </Card>

      {/* Add Service Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
          <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
            <Flex align="center">
              <Avatar icon={<FiPlus />} bg="blue.100" color="blue.600" mr={3} size="sm" />
              <Heading size="md">New Service Request</Heading>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <Stack spacing={5}>
              <FormControl>
                <FormLabel>Service Number</FormLabel>
                <Input
                  name="serviceNo"
                  value={formData.serviceNo}
                  onChange={handleInputChange}
                  placeholder="SRV-001"
                  borderRadius="lg"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Customer Name</FormLabel>
                <Input
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  borderRadius="lg"
                  leftElement={<FiUser color="gray.400" />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Mobile Model</FormLabel>
                <Input
                  name="mobileModel"
                  value={formData.mobileModel}
                  onChange={handleInputChange}
                  placeholder="iPhone 14 Pro"
                  borderRadius="lg"
                  leftElement={<FiSmartphone color="gray.400" />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  borderRadius="lg"
                  type="tel"
                  leftElement={<FiPhone color="gray.400" />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Issue Description</FormLabel>
                <Input
                  name="issue"
                  value={formData.issue}
                  onChange={handleInputChange}
                  placeholder="Describe the issue..."
                  borderRadius="lg"
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
            <Button variant="outline" mr={3} onClick={onClose} borderRadius="lg">
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddService} borderRadius="lg">
              Create Service
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Service;