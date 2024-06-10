export type CarRequest = {
  id?: string;
  plate: string;
  manufacture: string;
  model: string;
  image?: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  transmission: string;
  year: number;
};
