import LoginForm from "./pages/LoginPage/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Box, Flex } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import SideBar from "./components/Sidebar/SideBar";
import Fotter from "./components/Footer/Fotter";
import Register from "./pages/RegisterPage/Register";
function App() {
  return (
    <>
      <Router>
        <Flex direction="column" minH="100vh">
          <Header />
          <Flex flex="1">
            <Box>
              <SideBar />
            </Box>
            <Box flex="1" p="4" bg={"gray.50"}>
              <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/reg" element={<Register />} />
              </Routes>
            </Box>
          </Flex>
          <Fotter />
        </Flex>
      </Router>
    </>
  );
}

export default App;
