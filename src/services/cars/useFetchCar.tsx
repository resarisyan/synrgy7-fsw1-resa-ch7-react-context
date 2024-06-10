import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';

export const useFetchCars = () => {
  return useQuery({
    queryFn: async () => {
      const carResponse = await axiosInstance.get('/car');
      if (carResponse.status !== 200) {
        throw new Error('Error fetching cars');
      } else {
        return carResponse.data.data;
      }
    },
    queryKey: ['fetch.cars'],
  });
};
