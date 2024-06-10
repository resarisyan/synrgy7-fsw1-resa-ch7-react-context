import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { ChakraProvider } from '@chakra-ui/react';
import CarPage from './pages/CarPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrivateRoutes from './utils/PrivateRoutes';
import LoginPage from './pages/LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PublicRoutes from './utils/PublicRoutes';
import { CarProvider } from './context/CarContext';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const App: React.FC = () => (
  <BrowserRouter>
    <GoogleOAuthProvider clientId="449123188637-o6o9tno2tmg6ff6bcuvcsr3u4701je6j.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <AuthProvider>
            <PrivateRoutes>
              <CarProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/car" element={<CarPage />} />
                </Routes>
              </CarProvider>
            </PrivateRoutes>

            <PublicRoutes>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </PublicRoutes>
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

export default App;
