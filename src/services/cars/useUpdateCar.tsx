import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { CarRequest } from '../../utils/dto/request/carRequest';

export const useEditCar = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: CarRequest) => {
      console.log('body', body);
      const carResponse = await axiosInstance.put(`/car/${body.id}`, body);
      return carResponse;
    },
    onSuccess,
    onError,
  });
};
