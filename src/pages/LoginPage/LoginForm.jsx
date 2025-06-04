import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password, rememberMe });
    navigate("/stock");
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      px={2}
      position="relative"
      _before={{
        content: '""',
        position: "fixed",
        top: 0,
        left: 0,
        w: "100vw",
        h: "100vh",
        zIndex: 0,
        bgImage: "url('/bglogin.avif')", // ✅ Image from public folder
        bgSize: "cover",
        bgPosition: "center",
        filter: "blur(2px) brightness(0.7)",
      }}
    >
      <Box
        w={{ base: "100%", sm: "400px", md: "420px", lg: "430px" }}
        p={{ base: 4, sm: 8 }}
        bg={useColorModeValue("rgba(255,255,255,0.95)", "rgba(26,32,44,0.95)")}
        boxShadow="2xl"
        borderRadius="2xl"
        zIndex={1}
        backdropFilter="auto"
        backdropBlur="8px"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        transition="all 0.3s"
      >
        <Stack spacing={6} align="center" mb={6}>
          <Image
            boxSize="70px"
            src="/logo.jpg" // ✅ Logo from public folder
            alt="ClaudeBox Logo"
            objectFit="contain"
            borderRadius="full"
            border="2px solid"
            borderColor="blue.400"
            bg="white"
            shadow="md"
          />
          <Heading
            fontSize={{ base: "2xl", sm: "2.5xl" }}
            textAlign="center"
            color={useColorModeValue("blue.700", "blue.200")}
            fontWeight="extrabold"
            letterSpacing="tight"
          >
            Welcome Back to ClaudeBox Billing
          </Heading>
          <Text
            fontSize={{ base: "md", sm: "lg" }}
            color={useColorModeValue("gray.600", "gray.300")}
            textAlign="center"
          >
            Please sign in to access your billing dashboard
          </Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack spacing={5}>
            <FormControl id="email" isRequired>
              <FormLabel color={useColorModeValue("blue.700", "blue.200")}>
                Email address
              </FormLabel>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg={useColorModeValue("gray.50", "gray.700")}
                borderColor={useColorModeValue("blue.100", "blue.700")}
                _focus={{
                  borderColor: "blue.400",
                  boxShadow: "0 0 0 1px #4299e1",
                }}
                size="lg"
                fontSize="md"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel color={useColorModeValue("blue.700", "blue.200")}>
                Password
              </FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg={useColorModeValue("gray.50", "gray.700")}
                  borderColor={useColorModeValue("blue.100", "blue.700")}
                  _focus={{
                    borderColor: "blue.400",
                    boxShadow: "0 0 0 1px #4299e1",
                  }}
                  size="lg"
                  fontSize="md"
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    color={useColorModeValue("blue.500", "blue.200")}
                    _hover={{ bg: "transparent" }}
                    size="sm"
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack direction="row" align="center" justify="space-between">
              <Checkbox
                isChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                colorScheme="blue"
              >
                Remember me
              </Checkbox>
              <Link color="blue.400" fontSize="sm" href="#">
                Forgot password?
              </Link>
            </Stack>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontWeight="bold"
              w="full"
              borderRadius="full"
              shadow="md"
              _hover={{
                bg: "blue.600",
                transform: "translateY(-2px) scale(1.03)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
            >
              Sign In
            </Button>
          </Stack>
        </form>

        <Text
          fontSize="sm"
          textAlign="center"
          mt={6}
          color={useColorModeValue("gray.600", "gray.400")}
        >
          Don't have an account?{" "}
          <Link color="blue.400" href="/register" fontWeight="bold">
            Sign up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
