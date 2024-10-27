import React from 'react';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WifiForm from './components/WifiForm';
import WifiList from './components/WifiList';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box maxW="lg" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
          <Heading as="h1" size="lg" textAlign="center" mb={6}>
            WiFi Credentials Manager
          </Heading>

          {/* Navigation Links */}
          <Box mb={4} textAlign="center">
            <Link to="/" style={{ margin: '0 10px' }}>Add WiFi</Link>
            <Link to="/list" style={{ margin: '0 10px' }}>View Saved WiFi</Link>
          </Box>

          {/* Route Definitions */}
          <Routes>
            <Route path="/" element={<WifiForm />} />
            <Route path="/list" element={<WifiList />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
