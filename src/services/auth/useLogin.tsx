import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { LoginRequest } from '../../utils/dto/request/userRequest';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (body: LoginRequest) => {
      const userResponse = await axiosInstance.post('/auth/login', body);

      if (userResponse.status !== 200) {
        throw new Error('Error logging in');
      }

      const data = userResponse.data;
      localStorage.setItem('token', data.token);
      return userResponse;
    },
  });
};
