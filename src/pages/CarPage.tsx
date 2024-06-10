import {
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  ButtonGroup,
  Button,
  useToast,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  FormErrorMessage,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import { CarRequest } from '../utils/dto/request/carRequest';
import { useCar } from '../context/CarContext';
import { carValidationSchema } from '../utils/validators/car-validation';

export default function CarPage() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createCar, deleteCar, fetchCars, editCar } = useCar();

  const {
    data: cars,
    isLoading: carIsLoading,
    refetch: refetchCars,
  } = fetchCars;

  const formik = useFormik<CarRequest>({
    initialValues: {
      id: '',
      plate: '',
      manufacture: '',
      model: '',
      image: '',
      rentPerDay: 0,
      capacity: 0,
      description: '',
      transmission: '',
      year: 0,
    },
    validationSchema: carValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        if (values.id) {
          editCar.mutate(values, {
            onSuccess: () => {
              toast({
                title: 'Car updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              refetchCars();
              formik.resetForm();
              onClose();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
              const apiErrors = error.response?.data?.errors || {};
              setErrors(apiErrors);
              toast({
                title: 'Failed to update car',
                description:
                  error.response?.data?.message || 'An error occurred',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            },
            onSettled: () => {
              setSubmitting(false);
            },
          });
        } else {
          createCar.mutate(values, {
            onSuccess: () => {
              toast({
                title: 'Car added',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              refetchCars();
              formik.resetForm();
              onClose();
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
              const apiErrors = error.response?.data?.errors || {};
              setErrors(apiErrors);
              toast({
                title: 'Failed to create car',
                description:
                  error.response?.data?.message || 'An error occurred',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            },
            onSettled: () => {
              setSubmitting(false);
            },
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmitting(false);
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        formik.setFieldValue('image', reader.result);
      };
    }
  };

  const confirmationDelete = (carId: string) => {
    const shouldDelete = confirm('Are you sure?');

    if (shouldDelete) {
      deleteCar.mutate(carId, {
        onSuccess: () => {
          refetchCars();
          toast({
            title: 'Deleted car',
            status: 'info',
            duration: 3000,
            isClosable: true,
          });
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          toast({
            title: 'Failed to delete car',
            description: error.response?.data?.message || 'An error occurred',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        },
      });
    }
  };

  const onEditClick = (car: CarRequest) => {
    formik.setFieldValue('id', car.id);
    formik.setFieldValue('plate', car.plate);
    formik.setFieldValue('manufacture', car.manufacture);
    formik.setFieldValue('image', null);
    formik.setFieldValue('model', car.model);
    formik.setFieldValue('rentPerDay', car.rentPerDay);
    formik.setFieldValue('capacity', car.capacity);
    formik.setFieldValue('description', car.description);
    formik.setFieldValue('transmission', car.transmission);
    formik.setFieldValue('year', car.year);
    onOpen();
  };

  const renderCars = () => {
    if (!Array.isArray(cars)) {
      return null;
    }

    return cars.map((car: CarRequest) => (
      <Tr key={car.id} _hover={{ bg: 'gray.100' }}>
        <Td>{car.description}</Td>
        <Td>
          <img src={car.image} alt={car.id} width="100" />
        </Td>
        <Td>{car.plate}</Td>
        <Td>{car.manufacture}</Td>
        <Td>{car.model}</Td>
        <Td>{car.rentPerDay}</Td>
        <Td>{car.capacity}</Td>
        <Td>{car.transmission}</Td>
        <Td>{car.year}</Td>
        <Td>
          <ButtonGroup>
            <IconButton
              icon={<EditIcon />}
              onClick={() => onEditClick(car)}
              colorScheme="blue"
              aria-label="Edit car"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => confirmationDelete(car.id as string)}
              colorScheme="red"
              aria-label="Delete car"
            />
          </ButtonGroup>
        </Td>
      </Tr>
    ));
  };

  return (
    <Box p={4}>
      <Heading mb={4} size="lg" textAlign="center" color="gray.600">
        Car Page
      </Heading>
      <Button onClick={onOpen} colorScheme="blue" mb={4}>
        Add Car
      </Button>
      <Box overflowX="auto">
        <Table variant="simple" size="sm" mb={4}>
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Image</Th>
              <Th>Plate</Th>
              <Th>Manufacture</Th>
              <Th>Model</Th>
              <Th>Rent Per Day</Th>
              <Th>Capacity</Th>
              <Th>Transmission</Th>
              <Th>Year</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cars && renderCars()}
            {carIsLoading && (
              <Tr>
                <Td colSpan={10} textAlign="center">
                  <Spinner size="lg" />
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{formik.values.id ? 'Edit Car' : 'Add Car'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <VStack spacing="4">
                <FormControl
                  isInvalid={!!formik.errors.plate && formik.touched.plate}
                >
                  <FormLabel>Plate</FormLabel>
                  <Input
                    onChange={formik.handleChange}
                    name="plate"
                    value={formik.values.plate}
                  />
                  <FormErrorMessage>{formik.errors.plate}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!formik.errors.manufacture && formik.touched.manufacture
                  }
                >
                  <FormLabel>Manufacture</FormLabel>
                  <Input
                    onChange={formik.handleChange}
                    name="manufacture"
                    value={formik.values.manufacture}
                  />
                  <FormErrorMessage>
                    {formik.errors.manufacture}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!formik.errors.model && formik.touched.model}
                >
                  <FormLabel>Model</FormLabel>
                  <Input
                    onChange={formik.handleChange}
                    name="model"
                    value={formik.values.model}
                  />
                  <FormErrorMessage>{formik.errors.model}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!formik.errors.image && formik.touched.image}
                >
                  <FormLabel>Image</FormLabel>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!formik.errors.rentPerDay && formik.touched.rentPerDay
                  }
                >
                  <FormLabel>Rent Per Day</FormLabel>
                  <Input
                    onChange={formik.handleChange}
                    name="rentPerDay"
                    type="number"
                    value={formik.values.rentPerDay}
                  />
                  <FormErrorMessage>
                    {formik.errors.rentPerDay}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!formik.errors.capacity && formik.touched.capacity
                  }
                >
                  <FormLabel>Capacity</FormLabel>
                  <Input
                    onChange={formik.handleChange}
                    name="capacity"
                    type="number"
                    value={formik.values.capacity}
                  />
                  <FormErrorMessage>{formik.errors.capacity}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!formik.errors.description && formik.touched.description
                  }
                >
                  <FormLabel>Description</FormLabel>
                  <Input
                    onChange={formik.handleChange}
                    name="description"
                    value={formik.values.description}
                  />
                  <FormErrorMessage>
                    {formik.errors.description}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={
                    !!formik.errors.transmission && formik.touched.transmission
                  }
                >
                  <FormLabel>Transmission</FormLabel>
                  <Input
                    onChange={formik.handleChange}
                    name="transmission"
                    value={formik.values.transmission}
                  />
                  <FormErrorMessage>
                    {formik.errors.transmission}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!formik.errors.year && formik.touched.year}
                >
                  <FormLabel>Year</FormLabel>
                  <Input
                    onChange={formik.handleChange}
                    name="year"
                    type="number"
                    value={formik.values.year}
                  />
                  <FormErrorMessage>{formik.errors.year}</FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={formik.isSubmitting}
              >
                {formik.values.id ? 'Update Car' : 'Add Car'}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
