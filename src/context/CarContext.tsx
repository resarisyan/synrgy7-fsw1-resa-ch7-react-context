import { createContext, ReactNode, useContext } from 'react';
import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { CarRequest } from '../utils/dto/request/carRequest';
import { axiosInstance } from '../lib/axios';

interface CarContextProps {
  createCar: UseMutationResult<void, unknown, CarRequest, unknown>;
  deleteCar: UseMutationResult<void, unknown, string, unknown>;
  fetchCars: UseQueryResult<CarRequest[], unknown>;
  editCar: UseMutationResult<void, unknown, CarRequest, unknown>;
}

const CarContext = createContext<CarContextProps | undefined>(undefined);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const createCar = useMutation({
    mutationFn: async (body: CarRequest) => {
      const carResponse = await axiosInstance.post('/car', body);
      return carResponse.data;
    },
  });

  const deleteCar = useMutation({
    mutationFn: async (id: string) => {
      const carResponse = await axiosInstance.delete(`/car/${id}`);
      return carResponse.data;
    },
  });

  const fetchCars = useQuery({
    queryFn: async () => {
      const carResponse = await axiosInstance.get('/car');
      if (carResponse.status !== 200) {
        throw new Error('Error fetching cars');
      } else {
        return carResponse.data.data.data;
      }
    },
    queryKey: ['fetch.cars'],
  });

  const editCar = useMutation({
    mutationFn: async (body: CarRequest) => {
      const carResponse = await axiosInstance.put(`/car/${body.id}`, body);
      return carResponse.data.data;
    },
  });

  return (
    <CarContext.Provider value={{ createCar, deleteCar, fetchCars, editCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCar = () => {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error('useCar must be used within a CarProvider');
  }
  return context;
};
