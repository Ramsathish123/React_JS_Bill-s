import { useState, useEffect } from 'react';
import {
  Box, Flex, IconButton, useBreakpointValue, VStack, Link, Text, Icon, Button, useDisclosure
} from '@chakra-ui/react';
import {
  FiMenu, FiX, FiHome, FiUser, FiSettings, FiMail, FiHelpCircle, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { FaCloud } from 'react-icons/fa';

const LeftMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { isOpen: isMobileMenuOpen, onToggle: toggleMobileMenu } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const menuItems = [
    { icon: FiHome, label: 'Home', href: '/dashboard' },
    { icon: FiUser, label: 'Profile', href: '/profile' },
    { icon: FiMail, label: 'Messages', href: '/messages' },
    { icon: FiSettings, label: 'Settings', href: '/settings' },
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
    <Flex h="100vh" overflow="hidden" bgGradient="linear(to-br, #e3f0ff, #f7fafc)">
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
          bg="white"
          color="blue.500"
          borderRadius="full"
          shadow="md"
          _hover={{ bg: "blue.50" }}
        />
      )}

      {/* Sidebar */}
      <Box
        as="nav"
        bg="white"
        color="blue.700"
        h="100vh"
        position={isMobile ? "fixed" : "relative"}
        left={0}
        top={0}
        zIndex="sticky"
        w={isMobile ? "220px" : isMenuOpen ? "220px" : "70px"}
        transition="all 0.3s"
        boxShadow="2xl"
        borderRight="1px solid"
        borderColor="blue.100"
        transform={isMobile ? (isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)") : "translateX(0)"}
        pt={6}
        pb={6}
      >
        <Flex direction="column" h="full" p={2} overflowY="auto" align="center">
          {/* Logo */}
          <Box mb={8} w="full" display="flex" justifyContent="center" alignItems="center">
            <Box
              bgGradient="linear(to-br, blue.400, blue.200)"
              borderRadius="full"
              p={2}
              boxShadow="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              w={isMenuOpen || isMobile ? "48px" : "36px"}
              h={isMenuOpen || isMobile ? "48px" : "36px"}
              transition="all 0.2s"
            >
              <FaCloud size={isMenuOpen || isMobile ? 28 : 20} color="white" />
            </Box>
            {(isMenuOpen || isMobile) && (
              <Text
                ml={3}
                fontWeight="bold"
                fontSize="xl"
                color="blue.500"
                letterSpacing="tight"
                transition="all 0.2s"
              >
                CloudBox
              </Text>
            )}
          </Box>

          {/* Collapse/Expand Button */}
          {!isMobile && (
            <Button
              onClick={toggleMenu}
              variant="ghost"
              color="blue.400"
              alignSelf="flex-end"
              mb={4}
              p={2}
              _hover={{ bg: "blue.50" }}
              aria-label={isMenuOpen ? "Collapse menu" : "Expand menu"}
            >
              {isMenuOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
            </Button>
          )}

          {/* Menu Items */}
          <VStack align={isMenuOpen || isMobile ? "flex-start" : "center"} spacing={2} w="full">
            {menuItems.map((item, index) => (
              <Link
                as={RouterLink}
                to={item.href}
                key={index}
                display="flex"
                alignItems="center"
                p={isMenuOpen || isMobile ? 3 : 2}
                borderRadius="lg"
                w="full"
                fontWeight="medium"
                fontSize="md"
                color="blue.700"
                _hover={{
                  bg: "blue.50",
                  color: "blue.500",
                  textDecoration: "none",
                  shadow: "sm",
                }}
                transition="all 0.2s"
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
