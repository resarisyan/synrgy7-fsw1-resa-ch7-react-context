import * as Yup from 'yup';

export const carValidationSchema = Yup.object().shape({
  plate: Yup.string().required('Plate is required'),
  manufacture: Yup.string().required('Manufacture is required'),
  model: Yup.string().required('Model is required'),
  rentPerDay: Yup.number().required('Rent Per Day is required'),
  capacity: Yup.number().required('Capacity is required'),
  description: Yup.string().required('Description is required'),
  transmission: Yup.string().required('Transmission is required'),
  year: Yup.number().required('Year is required'),
});
