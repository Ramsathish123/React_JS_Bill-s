import React from 'react';
import { 
  Box, 
  Text, 
  Flex, 
  SimpleGrid, 
  Card, 
  CardHeader, 
  CardBody, 
  Stat, 
  StatLabel, 
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
  Progress,
  useColorModeValue,
  Badge,
  Avatar,
  AvatarGroup
} from '@chakra-ui/react';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  ArcElement,
  Tooltip,
  Legend 
} from 'chart.js';
import { FiTrendingUp, FiSmartphone, FiDollarSign, FiPackage } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Register ChartJS components
ChartJS.register(
  BarElement, 
  CategoryScale, 
  LinearScale, 
  ArcElement,
  Tooltip,
  Legend
);

const MotionCard = motion(Card);

export default function Dashboard() {
  const cardBg = useColorModeValue('white', 'gray.700');
  const headerColor = useColorModeValue('blue.600', 'blue.300');
  const statBg = useColorModeValue('blue.50', 'blue.900');
  
  // Dummy data for mobile shop
  const stockData = {
    labels: ['iPhone', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme'],
    datasets: [
      {
        data: [120, 90, 75, 60, 45, 30],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderWidth: 1,
      }
    ]
  };

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales (₹)',
        data: [450000, 390000, 580000, 420000, 510000, 620000, 700000],
        backgroundColor: [
          '#3182CE',
          '#4299E1',
          '#63B3ED',
          '#90CDF4',
          '#3182CE',
          '#4299E1',
          '#63B3ED'
        ],
        borderColor: '#2C5282',
        borderWidth: 1,
        borderRadius: 6,
      }
    ]
  };

  const topSellers = [
    { name: 'iPhone 14 Pro', sales: 85, color: 'blue' },
    { name: 'Samsung S23', sales: 72, color: 'green' },
    { name: 'Xiaomi 13 Pro', sales: 58, color: 'red' },
    { name: 'Oppo Reno 8', sales: 42, color: 'purple' }
  ];

  return (
    <Box p={{ base: 4, md: 6 }} bg={useColorModeValue('gray.50', 'gray.800')} minH="100vh">
      <Flex justify="space-between" align="center" mb={8}>
        <Text fontSize="2xl" fontWeight="bold" color={headerColor}>
          📱 MobileShop Analytics
        </Text>
        <Badge colorScheme="green" fontSize="sm" px={3} py={1} borderRadius="full">
          Live Data
        </Badge>
      </Flex>
      
      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mb={8}>
        <MotionCard 
          bg={cardBg} 
          borderRadius="xl" 
          boxShadow="lg"
          whileHover={{ y: -5 }}
        >
          <CardBody>
            <Flex align="center">
              <Box p={3} bg="blue.100" borderRadius="full" mr={4}>
                <Icon as={FiDollarSign} w={6} h={6} color="blue.600" />
              </Box>
              <Stat>
                <StatLabel color="gray.500">Total Sales</StatLabel>
                <StatNumber>₹3.67M</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" color="green.500" />
                  <Text as="span" color="green.500">12.5%</Text> from last month
                </StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </MotionCard>
        
        <MotionCard 
          bg={cardBg} 
          borderRadius="xl" 
          boxShadow="lg"
          whileHover={{ y: -5 }}
        >
          <CardBody>
            <Flex align="center">
              <Box p={3} bg="green.100" borderRadius="full" mr={4}>
                <Icon as={FiSmartphone} w={6} h={6} color="green.600" />
              </Box>
              <Stat>
                <StatLabel color="gray.500">Total Devices</StatLabel>
                <StatNumber>420</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" color="green.500" />
                  <Text as="span" color="green.500">8%</Text> from last month
                </StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </MotionCard>
        
        <MotionCard 
          bg={cardBg} 
          borderRadius="xl" 
          boxShadow="lg"
          whileHover={{ y: -5 }}
        >
          <CardBody>
            <Flex align="center">
              <Box p={3} bg="purple.100" borderRadius="full" mr={4}>
                <Icon as={FiTrendingUp} w={6} h={6} color="purple.600" />
              </Box>
              <Stat>
                <StatLabel color="gray.500">Top Brand</StatLabel>
                <StatNumber>iPhone</StatNumber>
                <StatHelpText>
                  <Text as="span" color="blue.500">35%</Text> of total sales
                </StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </MotionCard>
        
        <MotionCard 
          bg={cardBg} 
          borderRadius="xl" 
          boxShadow="lg"
          whileHover={{ y: -5 }}
        >
          <CardBody>
            <Flex align="center">
              <Box p={3} bg="orange.100" borderRadius="full" mr={4}>
                <Icon as={FiPackage} w={6} h={6} color="orange.600" />
              </Box>
              <Stat>
                <StatLabel color="gray.500">Inventory</StatLabel>
                <StatNumber>82%</StatNumber>
                <StatHelpText>
                  <Progress value={82} size="xs" colorScheme="orange" mt={2} borderRadius="full" />
                </StatHelpText>
              </Stat>
            </Flex>
          </CardBody>
        </MotionCard>
      </SimpleGrid>
      
      {/* Charts Section */}
      <Flex direction={{ base: 'column', lg: 'row' }} gap={6} mb={8}>
        {/* Sales Bar Chart */}
        <MotionCard 
          flex={1} 
          bg={cardBg} 
          borderRadius="xl" 
          boxShadow="lg"
          whileHover={{ scale: 1.01 }}
        >
          <CardHeader borderBottom="1px" borderColor="gray.100">
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="semibold">Monthly Sales Performance</Text>
              <Badge colorScheme="blue" px={2} py={1} borderRadius="md">
                ₹7.0L in Jul
              </Badge>
            </Flex>
          </CardHeader>
          <CardBody>
            <Box h="300px">
              <Bar 
                data={salesData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')
                      },
                      ticks: {
                        callback: function(value) {
                          return '₹' + (value / 1000) + 'k';
                        }
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return 'Sales: ₹' + context.raw.toLocaleString('en-IN');
                        }
                      }
                    }
                  }
                }}
              />
            </Box>
          </CardBody>
        </MotionCard>
        
        {/* Stock Pie Chart */}
        <MotionCard 
          flex={1} 
          bg={cardBg} 
          borderRadius="xl" 
          boxShadow="lg"
          whileHover={{ scale: 1.01 }}
        >
          <CardHeader borderBottom="1px" borderColor="gray.100">
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="semibold">Inventory Distribution</Text>
              <Badge colorScheme="green" px={2} py={1} borderRadius="md">
                420 Units
              </Badge>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction={{ base: 'column', md: 'row' }} align="center">
              <Box w={{ base: '100%', md: '60%' }} h="250px">
                <Pie 
                  data={stockData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          usePointStyle: true,
                          padding: 20
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} units (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }}
                />
              </Box>
              <Box w={{ base: '100%', md: '40%' }} mt={{ base: 4, md: 0 }}>
                {stockData.labels.map((brand, index) => (
                  <Flex key={brand} align="center" mb={3}>
                    <Box 
                      w="12px" 
                      h="12px" 
                      borderRadius="sm" 
                      bg={stockData.datasets[0].backgroundColor[index]}
                      mr={3}
                    />
                    <Text flex={1} fontSize="sm">{brand}</Text>
                    <Text fontSize="sm" fontWeight="medium">
                      {stockData.datasets[0].data[index]} units
                    </Text>
                  </Flex>
                ))}
              </Box>
            </Flex>
          </CardBody>
        </MotionCard>
      </Flex>
      
      {/* Bottom Section */}
      <Flex direction={{ base: 'column', lg: 'row' }} gap={6}>
        {/* Top Sellers */}
        <MotionCard 
          w={{ base: '100%', lg: '40%' }} 
          bg={cardBg} 
          borderRadius="xl" 
          boxShadow="lg"
          whileHover={{ scale: 1.01 }}
        >
          <CardHeader borderBottom="1px" borderColor="gray.100">
            <Text fontSize="lg" fontWeight="semibold">🔥 Top Selling Models</Text>
          </CardHeader>
          <CardBody>
            {topSellers.map((item, index) => (
              <Box key={index} mb={4}>
                <Flex justify="space-between" mb={1}>
                  <Text fontWeight="medium">{item.name}</Text>
                  <Text fontWeight="bold">{item.sales} sold</Text>
                </Flex>
                <Progress 
                  value={item.sales} 
                  max={100} 
                  size="sm" 
                  colorScheme={item.color}
                  borderRadius="full"
                />
              </Box>
            ))}
          </CardBody>
        </MotionCard>
        
        {/* Recent Activity */}
        <MotionCard 
          flex={1} 
          bg={cardBg} 
          borderRadius="xl" 
          boxShadow="lg"
          whileHover={{ scale: 1.01 }}
        >
          <CardHeader borderBottom="1px" borderColor="gray.100">
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="semibold">Recent Activity</Text>
              <AvatarGroup size="sm" max={3}>
                <Avatar name="John Doe" src="https://bit.ly/dan-abramov" />
                <Avatar name="Jane Smith" src="https://bit.ly/kent-c-dodds" />
                <Avatar name="Mike Ross" src="https://bit.ly/ryan-florence" />
              </AvatarGroup>
            </Flex>
          </CardHeader>
          <CardBody>
            {[
              { action: 'Sold 5 iPhone 14 Pro', time: '2 hours ago', icon: '💰', color: 'green' },
              { action: 'Received Samsung S23 shipment', time: '5 hours ago', icon: '📦', color: 'blue' },
              { action: 'Monthly target achieved (105%)', time: '1 day ago', icon: '🎯', color: 'purple' },
              { action: 'Xiaomi Redmi Note 12 out of stock', time: '2 days ago', icon: '⚠️', color: 'red' },
              { action: 'New Oppo Reno 8 display setup', time: '3 days ago', icon: '🆕', color: 'teal' }
            ].map((item, index) => (
              <Flex key={index} mb={4} align="start">
                <Box fontSize="xl" mr={3}>{item.icon}</Box>
                <Box flex={1}>
                  <Text fontWeight="medium">{item.action}</Text>
                  <Text fontSize="sm" color="gray.500">{item.time}</Text>
                </Box>
                <Badge colorScheme={item.color} variant="subtle" fontSize="xs">
                  {item.color === 'red' ? 'Urgent' : 'Update'}
                </Badge>
              </Flex>
            ))}
          </CardBody>
        </MotionCard>
      </Flex>
    </Box>
  );
}