import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Box,
  Heading,
  VStack,
  Flex,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage: React.FC = () => {
  const toast = useToast();
  const { loginMutation, googleLoginMutation } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        await loginMutation.mutateAsync({ username, password });
        toast({
          title: 'Logged in',
          status: 'success',
        });
        return <Navigate to="/car" />;
      } catch (error) {
        toast({
          title: 'Failed to login',
          status: 'error',
        });
      }

      formik.resetForm();
    },
  });

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        bg="white"
        p={8}
        boxShadow="lg"
        rounded="lg"
        maxW="md"
        w="full"
        mx="auto"
      >
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Login Page
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </FormControl>
            <Button colorScheme="blue" type="submit" w="full">
              Submit
            </Button>
          </VStack>
        </form>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              await googleLoginMutation.mutateAsync({
                credential: credentialResponse.credential as string,
              });
              toast({
                title: 'Logged in',
                status: 'success',
              });
              window.location.href = '/car';
            } catch (error) {
              toast({
                title: 'Failed to login',
                status: 'error',
              });
            }
          }}
          onError={() => {
            toast({
              title: 'Failed to login',
              status: 'error',
            });
          }}
        />
      </Box>
    </Flex>
  );
};

export default LoginPage;
