import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';

export const useDeleteCar = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const carResponse = await axiosInstance.delete(`/car/${id}`);
      return carResponse.data;
    },
    onSuccess,
    onError,
  });
};
