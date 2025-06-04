import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfromPassword, setShowConformPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Submitted:", { userName, email, password });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100" p={4}>
      {/* Centered Box */}
      <Flex
        bg="white"
        w={{ base: "100%", md: "80%", lg: "60%" }}
        maxW="1000px"
        borderRadius="lg"
        boxShadow="lg"
        overflow="hidden"
      >
        {/* Left Side */}
        <Flex
          flex="1"
          color="white"
          bgColor={"lightpink"}
          align="center"
          justify="center"
          direction="column"
          p={10}
        >
          <Heading mb={4}>Welcome Back!</Heading>
          <Text mb={6} textAlign="center">
            To keep connected with us please login with your personal info
          </Text>
          <Button
            variant="outline"
            colorScheme="whiteAlpha"
            borderColor="white"
            _hover={{ bg: "white", color: "lightpink" }}
          >
            SIGN IN
          </Button>
        </Flex>

        {/* Right Side */}
        <Flex flex="1" align="center" justify="center" p={10}>
          <Box w="full" maxW="md">
            <Heading fontSize="2xl" textAlign="center" mb={4}>
              Create Account
            </Heading>

            {/* Social Buttons */}
            <Flex justify="center" mb={4} gap={4}>
              <IconButton
                icon={<FaFacebookF />}
                colorScheme="facebook"
                variant="outline"
                isRound
              />
              <IconButton
                icon={<FaGoogle />}
                colorScheme="red"
                variant="outline"
                isRound
              />
              <IconButton
                icon={<FaLinkedinIn />}
                colorScheme="linkedin"
                variant="outline"
                isRound
              />
            </Flex>

            <Text textAlign="center" color="gray.500" mb={6}>
              or use your email for registration:
            </Text>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <Input
                    border={"none"}
                    borderBottom={"1px"}
                    borderColor={"#e4e9ef"}
                    borderRadius={"0"}
                    type="text"
                    placeholder="Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <Input
                    border={"none"}
                    borderBottom={"1px"}
                    borderColor={"#e4e9ef"}
                    borderRadius={"0"}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl isRequired>
                  <InputGroup>
                    <Input
                      border={"none"}
                      borderBottom={"1px"}
                      borderColor={"#e4e9ef"}
                      borderRadius={"0"}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                        size="sm"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <InputGroup>
                    <Input
                      border={"none"}
                      borderBottom={"1px"}
                      borderColor={"#e4e9ef"}
                      borderRadius={"0"}
                      type={showConfromPassword ? "text" : "password"}
                      placeholder="Confrom Password"
                      value={conformPassword}
                      onChange={(e) => setConformPassword(e.target.value)}
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          setShowConformPassword(!showConfromPassword)
                        }
                        size="sm"
                      >
                        {showConfromPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  bgColor={"lightpink"}
                  color={"white"}
                  mt={4}
                >
                  SIGN UP
                </Button>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;
