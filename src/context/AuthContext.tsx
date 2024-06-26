import { createContext, ReactNode, useContext } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import {
  GoogleLoginRequest,
  LoginRequest,
} from '../utils/dto/request/userRequest';

interface AuthContextProps {
  loginMutation: UseMutationResult<void, unknown, LoginRequest, unknown>;
  googleLoginMutation: UseMutationResult<
    void,
    unknown,
    GoogleLoginRequest,
    unknown
  >;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const loginMutation = useMutation<void, unknown, LoginRequest, unknown>({
    mutationFn: async (body: LoginRequest) => {
      const userResponse = await axiosInstance.post('/auth/login', body);

      if (userResponse.status !== 200) {
        throw new Error('Error logging in');
      }

      const data = userResponse.data;
      localStorage.setItem('token', data.token);
    },
  });

  const googleLoginMutation = useMutation<
    void,
    unknown,
    GoogleLoginRequest,
    unknown
  >({
    mutationFn: async (body: GoogleLoginRequest) => {
      const userResponse = await axiosInstance.post('/auth/google-login', body);

      if (userResponse.status !== 200) {
        throw new Error('Error logging in');
      }

      const response = userResponse.data;
      localStorage.setItem('token', response.data.token);
    },
  });

  return (
    <AuthContext.Provider value={{ loginMutation, googleLoginMutation }}>
      {children}
    </AuthContext.Provider>
  );
};
