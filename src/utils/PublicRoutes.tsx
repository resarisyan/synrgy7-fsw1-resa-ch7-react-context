import { Navigate } from 'react-router';

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/car" />;
  }
  return children;
};

export default PublicRoutes;
