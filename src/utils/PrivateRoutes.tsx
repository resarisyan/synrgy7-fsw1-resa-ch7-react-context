import { Navigate } from 'react-router';

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoutes;
