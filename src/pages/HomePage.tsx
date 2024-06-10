import React from 'react';
import { Button, ButtonGroup, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/about');
  };
  return (
    <Container maxW="container.md">
      <h1>Home Page</h1>
      <ButtonGroup>
        <Button onClick={handleClick}>Go to About</Button>
      </ButtonGroup>
    </Container>
  );
};
export default HomePage;
