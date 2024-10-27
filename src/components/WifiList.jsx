import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Text, VStack, Spinner, useToast } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Ensure this path points to where your Firebase config and initialization are

const WifiList = () => {
  const [wifiData, setWifiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchWifiCredentials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'wifiCredentials'));
        const wifiList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setWifiData(wifiList);
      } catch (error) {
        console.error("Error fetching documents: ", error);
        toast({
          title: "Error!",
          description: `Failed to fetch WiFi credentials: ${error.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWifiCredentials();
  }, [toast]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <ChakraProvider>
      <Box maxW="md" mx="auto" mt={4} p={4} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
          Saved WiFi Credentials
        </Text>
        <VStack spacing={4} align="stretch">
          {wifiData.map((wifi) => (
            <Box key={wifi.id} p={3} borderWidth={1} borderRadius="md" boxShadow="md">
              <Text fontWeight="bold">WiFi ID: {wifi.wifiId}</Text>
              <Text>Password: {wifi.password}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default WifiList;
