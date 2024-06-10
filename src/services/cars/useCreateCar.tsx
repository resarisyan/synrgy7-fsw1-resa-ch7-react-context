import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { CarRequest } from '../../utils/dto/request/carRequest';
export const useCreateCar = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: CarRequest) => {
      const carResponse = await axiosInstance.post('/car', body);

      return carResponse;
    },
    onSuccess,
    onError,
  });
};
