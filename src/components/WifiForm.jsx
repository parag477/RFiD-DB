import React, { useState } from 'react';
import { ChakraProvider, Box, FormControl, FormLabel, Input, Button, useToast, Text } from '@chakra-ui/react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBq66a3boLKx2o4nTbWX4y_Ho6bG6IopW8",
  authDomain: "eicher-app-2c931.firebaseapp.com",
  projectId: "eicher-app-2c931",
  storageBucket: "eicher-app-2c931.appspot.com",
  messagingSenderId: "735561156602",
  appId: "1:735561156602:web:486e9312b0eae831f1c643",
  measurementId: "G-35QDFSWV50"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const WifiForm = () => {
  const [wifiId, setWifiId] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new document in Firestore
    try {
      const docRef = await addDoc(collection(db, 'wifiCredentials'), {
        wifiId: wifiId,
        password: password,
      });
      toast({
        title: "Success!",
        description: "WiFi credentials saved successfully. Document ID: " + docRef.id,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Clear the input fields after successful submission
      setWifiId('');
      setPassword('');
    } catch (error) {
      console.error("Error adding document: ", error); // Log the error to the console
      toast({
        title: "Error!",
        description: `Failed to save WiFi credentials: ${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box maxW="md" mx="auto" mt={4} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
        Connect to WIFI
      </Text>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="wifiId">WIFI ID</FormLabel>
            <Input
              id="wifiId"
              value={wifiId}
              onChange={(e) => setWifiId(e.target.value)}
              placeholder="Enter WIFI ID"
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default WifiForm;
