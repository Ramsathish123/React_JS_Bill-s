import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  useBreakpointValue,
  VStack,
  Link,
  Text,
  Icon,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiSettings,
  FiMail,
  FiHelpCircle,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
} from "react-icons/fi";
import { Outlet, Link as RouterLink } from "react-router-dom";
import Header from "../Header/Header";
const LeftMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { isOpen: isMobileMenuOpen, onToggle: toggleMobileMenu } =
    useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const menuItems = [
    { icon: FiHome, label: "Home", href: "/dashboard" },
    { icon: FiUser, label: "Service", href: "/service" },
    { icon: FiMail, label: "Stock", href: "/stock" },
    { icon: FiSettings, label: "Expense", href: "/expense" },
    { icon: FiFileText, label: "Invoice", href: "/invoice" },
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
        transform={
          isMobile
            ? isMobileMenuOpen
              ? "translateX(0)"
              : "translateX(-100%)"
            : "translateX(0)"
        }
      >
        <Flex direction="column" h="full" p={4} overflowY="auto">
          {/* Logo and Neon App Name */}
          <Flex
            align="center"
            mb={10}
            w="full"
            justify={isMenuOpen || isMobile ? "flex-start" : "center"}
            direction="row"
          >
            <Box
              bg="gray.900"
              borderRadius="full"
              boxShadow="0 0 16px #00fff7, 0 0 32px #00fff7"
              p={1}
              mr={isMenuOpen || isMobile ? 4 : 0}
              transition="margin 0.3s"
            >
              <img
                src="/logo.jpg"
                alt="TechAppzy Logo"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  display: "block",
                  background: "#222",
                  boxShadow: "0 0 12px #00fff7",
                }}
              />
            </Box>
            {(isMenuOpen || isMobile) && (
              <Text
                fontWeight="bold"
                fontSize="2xl"
                letterSpacing="wider"
                color="#00fff7"
                textShadow="0 0 8px #00fff7, 0 0 16px #00fff7, 0 0 32px #0ff"
                fontFamily="Orbitron, Segoe UI, sans-serif"
                ml={2}
                userSelect="none"
              >
                TechAppzy
              </Text>
            )}
          </Flex>

          <VStack
            align={isMenuOpen || isMobile ? "flex-start" : "center"}
            spacing={4}
          >
            {/* Menu toggle icon at the top */}
            <Button
              onClick={toggleMenu}
              leftIcon={<FiMenu />}
              variant="ghost"
              color="white"
              w="full"
              justifyContent={isMenuOpen || isMobile ? "flex-start" : "center"}
              p={2}
              _hover={{ bg: "gray.700" }}
              aria-label="Toggle menu"
            >
              {(isMenuOpen || isMobile) && (
                <Text
                  ml={3}
                  display={{
                    base: "block",
                    md: isMenuOpen ? "block" : "none",
                  }}
                >
                  Menu
                </Text>
              )}
            </Button>
            {/* Render the rest of the menu items */}
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
                _hover={{ bg: "gray.700", textDecoration: "none" }}
              >
                <Icon as={item.icon} boxSize={5} />
                {(isMenuOpen || isMobile) && (
                  <Text
                    ml={3}
                    display={{
                      base: "block",
                      md: isMenuOpen ? "block" : "none",
                    }}
                  >
                    {item.label}
                  </Text>
                )}
              </Link>
            ))}
          </VStack>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box flex="1" transition="margin-left 0.3s ease" overflowY="auto">
        <Header />
        <Outlet />
      </Box>
    </Flex>
  );
};

export default LeftMenu;
