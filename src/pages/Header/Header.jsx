import React, { useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  VStack,
  HStack,
  useDisclosure,
  Portal,
  SlideFade,
  Icon,
  Divider
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
  EditIcon,
  SettingsIcon,
  LockIcon,
  QuestionOutlineIcon
} from "@chakra-ui/icons";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profileRef = useRef(null);

  // User data
  const user = {
    name: "balachandran Chandran",
    email: "balachandranballu1212@gmail.com",
    avatar: "https://bit.ly/dan-abramov",
    role: "Premium Member"
  };

  const handleSignOut = () => {
    console.log("User signed out");
    onClose();
  };

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    onClose();
  };

  // Color values
  const bg = useColorModeValue("white", "gray.800");
  const dropdownBg = useColorModeValue("white", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.600");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const nameColor = useColorModeValue("gray.800", "white");
  const roleColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Box
      as="header"
      w="100%"
      py={3}
      px={{ base: 4, md: 8 }}
      bg={bg}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex="sticky"
      borderBottomWidth="1px"
      borderColor={borderColor}
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        align="center"
        justify="space-between"
      >
        {/* Logo/Brand */}
        <Heading as="h1" size="lg" fontWeight="bold" letterSpacing="tight">
     
        </Heading>

        {/* Right side controls */}
        <HStack spacing={3}>
          {/* Dark mode toggle */}
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            borderRadius="full"
            size="sm"
          />

          {/* Profile dropdown */}
          <Box ref={profileRef}>
            <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
              <MenuButton
                as={Button}
                variant="ghost"
                rightIcon={<ChevronDownIcon />}
                px={2}
                borderRadius="full"
                size="sm"
                _hover={{ bg: hoverBg }}
                _expanded={{ bg: hoverBg }}
              >
                <HStack spacing={2}>
                  <Avatar size="sm" name={user.name} src={user.avatar} />
                  <Text display={{ base: "none", md: "block" }} fontWeight="medium">
                    {user.name.split(" ")[0]}
                  </Text>
                </HStack>
              </MenuButton>

              <Portal>
                <MenuList
                  minW="300px"
                  p={0}
                  border="1px solid"
                  borderColor={borderColor}
                  boxShadow="xl"
                  bg={dropdownBg}
                >
                  <SlideFade in={isOpen} offsetY={-10}>
                    <Box p={4}>
                      <VStack align="flex-start" spacing={1}>
                        <HStack spacing={3}>
                          <Avatar size="md" name={user.name} src={user.avatar} />
                          <VStack align="flex-start" spacing={0}>
                            <Text fontWeight="bold" fontSize="md" color={nameColor}>
                              {user.name}
                            </Text>
                            <Text fontSize="sm" color={textColor}>
                              {user.email}
                            </Text>
                            <Text fontSize="xs" color={roleColor} fontWeight="semibold">
                              {user.role}
                            </Text>
                          </VStack>
                        </HStack>
                      </VStack>
                    </Box>

                    <Divider />

                    {/* <VStack spacing={1} p={2}>
                      <MenuItem
                        icon={<EditIcon boxSize={4} />}
                        _hover={{ bg: hoverBg }}
                        onClick={handleEditProfile}
                        borderRadius="md"
                      >
                        Edit Profile
                      </MenuItem>
                      <MenuItem
                        icon={<SettingsIcon boxSize={4} />}
                        _hover={{ bg: hoverBg }}
                        borderRadius="md"
                      >
                        Account Settings
                      </MenuItem>
                      <MenuItem
                        icon={<LockIcon boxSize={4} />}
                        _hover={{ bg: hoverBg }}
                        borderRadius="md"
                      >
                        Privacy & Security
                      </MenuItem>
                    </VStack> */}

                    <Divider />

                    <VStack spacing={1} p={2}>
                      {/* <MenuItem
                        icon={<QuestionOutlineIcon boxSize={4} />}
                        _hover={{ bg: hoverBg }}
                        borderRadius="md"
                      >
                        Help & Support
                      </MenuItem> */}
                      <MenuItem
                        icon={<Icon as={FiLogOut} boxSize={4} />}
                        _hover={{ bg: "blue.50" }}
                        color="blue.500"
                        onClick={handleSignOut}
                        borderRadius="md"
                      >
                        Sign Out
                      </MenuItem>
                    </VStack>
                  </SlideFade>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;