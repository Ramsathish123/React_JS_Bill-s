import LoginForm from "./pages/LoginPage/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Box, Flex } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import Fotter from "./components/Footer/Fotter";
import Register from "./pages/RegisterPage/Register";
import "./App.css";
import LeftMenu from "./pages/Menu/LeftMenu";
import Dashboard from "./pages/dashboard/dashboard";
import Stock from "./pages/Stock/stock";

function App() {
  return (
    <Router>
      <Routes>
        {/* Standalone routes */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/reg" element={<Register />} />

        {/* Layout route with nested content */}
        <Route path="/" element={<LeftMenu />}>
           <Route path="stock" element={<Stock/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
