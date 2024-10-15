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

export default function SignUp() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enableSignUp, setEnableSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Enable the Sign Up button only if the passwords match and are not empty
    setEnableSignUp(
      password !== "" && confirmPassword !== "" && password === confirmPassword
    );
  }, [password, confirmPassword]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let data = await axios.post("./api/signup", {
        userName: userName,
        password: password,
      });
      alert(data.data.message);
      if (data.data.message === "User created successfully") {
        router.push("/Login");
      } else if (data.data.message === "User already exists. Please log in.") {
        router.push("/Login");
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
    } else if (event.target.id === "confirmPassword") {
      setConfirmPassword(event.target.value);
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
        Signup
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl id="userName">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={userName}
              onChange={handleChange}
              focusBorderColor="blue.500"
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={handleChange}
              focusBorderColor="blue.500"
            />
          </FormControl>

          <FormControl id="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={handleChange}
              focusBorderColor="blue.500"
            />
          </FormControl>

          {!enableSignUp && (
            <Text color="red.500">Passwords do not match</Text>
          )}

          <Button type="submit" colorScheme="blue" width="full" isDisabled={!enableSignUp}>
            Signup
          </Button>
        </VStack>
      </form>

      <Text mt="4" textAlign="center">
        Already have an account?{" "}
        <Link color="blue.500" onClick={() => router.push("/Login")}>
          Login
        </Link>
      </Text>
    </Box>
  );
}
