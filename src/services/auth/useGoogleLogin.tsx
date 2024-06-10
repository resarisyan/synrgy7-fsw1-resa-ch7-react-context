import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { GoogleLoginRequest } from '../../utils/dto/request/userRequest';

export const useGoogleLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: GoogleLoginRequest) => {
      const userResponse = await axiosInstance.post('/auth/google-login', body);
      if (userResponse.status !== 200) {
        throw new Error('Error logging in');
      }
      const response = userResponse.data;
      localStorage.setItem('token', response.data.token);
      return userResponse;
    },
    onSuccess,
    onError,
  });
};
