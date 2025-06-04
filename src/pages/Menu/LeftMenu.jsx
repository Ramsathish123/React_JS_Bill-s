import { useState, useEffect } from 'react';
import {
  Box, Flex, IconButton, useBreakpointValue, VStack, Link, Text, Icon, Button, useDisclosure
} from '@chakra-ui/react';
import {
  FiMenu, FiX, FiHome, FiUser, FiSettings, FiMail, FiHelpCircle, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { Outlet, Link as RouterLink } from 'react-router-dom';

const LeftMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { isOpen: isMobileMenuOpen, onToggle: toggleMobileMenu } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const menuItems = [
    { icon: FiHome, label: 'Home', href: '/dashboard' },
    { icon: FiUser, label: 'Service', href: '/service' },
    { icon: FiMail, label: 'Stock', href: '/stock' },
    { icon: FiSettings, label: 'Expense', href: '/expense' },
    { icon: FiHelpCircle, label: 'Help', href: '/help' },
  ];

  const toggleMenu = () => {
    if (isMobile) toggleMobileMenu();
    else setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(!isMobile);
  }, [isMobile]);

  return (
    <Flex h="100vh" overflow="hidden">
      {/* Mobile menu button */}
      {isMobile && (
        <IconButton
          icon={isMobileMenuOpen ? <FiX /> : <FiMenu />}
          onClick={toggleMenu}
          position="fixed"
          top={4}
          left={4}
          zIndex="overlay"
          aria-label="Toggle menu"
          colorScheme="blue"
        />
      )}

      {/* Sidebar */}
      <Box
        as="nav"
        bg="gray.800"
        color="white"
        h="100vh"
        position={isMobile ? "fixed" : "relative"}
        left={0}
        top={0}
        zIndex="sticky"
        w={isMobile ? "250px" : isMenuOpen ? "250px" : "80px"}
        transition="all 0.3s ease"
        transform={isMobile ? (isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)") : "translateX(0)"}
      >
        <Flex direction="column" h="full" p={4} overflowY="auto">
          {!isMobile && (
            <Button
              onClick={toggleMenu}
              variant="ghost"
              color="white"
              alignSelf="flex-end"
              mb={4}
              p={2}
              _hover={{ bg: 'gray.700' }}
              aria-label={isMenuOpen ? "Collapse menu" : "Expand menu"}
            >
              {isMenuOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
            </Button>
          )}

          <VStack align={isMenuOpen || isMobile ? "flex-start" : "center"} spacing={4}>
            {menuItems.map((item, index) => (
              <Link
                as={RouterLink}
                to={item.href}
                key={index}
                display="flex"
                alignItems="center"
                p={2}
                borderRadius="md"
                w="full"
                _hover={{ bg: 'gray.700', textDecoration: 'none' }}
              >
                <Icon as={item.icon} boxSize={5} />
                {(isMenuOpen || isMobile) && (
                  <Text ml={3} display={{ base: 'block', md: isMenuOpen ? 'block' : 'none' }}>
                    {item.label}
                  </Text>
                )}
              </Link>
            ))}
          </VStack>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box
        flex="1"
        transition="margin-left 0.3s ease"
        p={4}
        overflowY="auto"
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default LeftMenu;
