import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";

export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("userName")) {
      router.replace("./"); // Use replace to avoid adding extra entries in history
    }
  }, []); // Remove router as dependency

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let data = await axios.post("./api/login", {
        userName: userName,
        password: password,
      });
      if (data.data.message === "Logged in successfully") {
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("password", password);
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        router.push("./");
      } else {
        alert(data.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (event: any) => {
    if (event.target.id === "userName") {
      setUsername(event.target.value);
    } else if (event.target.id === "password") {
      setPassword(event.target.value);
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="10"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="lg" textAlign="center" mb="6">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl id="userName">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={userName}
              onChange={handleChange}
              autoComplete="username"
              focusBorderColor="blue.500"
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={handleChange}
              autoComplete="current-password"
              focusBorderColor="blue.500"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Login
          </Button>
        </VStack>
      </form>

      <Text mt="4" textAlign="center">
        Don&apos;t have an account?{" "}
        <Link color="blue.500" onClick={() => router.push("/Register")}>
          Signup
        </Link>
      </Text>
    </Box>
  );
}
