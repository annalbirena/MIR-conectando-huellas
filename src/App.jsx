import '@mantine/core/styles.css';
import { Button, MantineProvider, Title } from '@mantine/core';
import theme from './theme';

function App() {
  return (
    <MantineProvider theme={theme}>
      <Title>Mascotas</Title>
      <Button variant="filled">Hola</Button>
      <Button variant="filled" color="purpleBrand">
        Hola
      </Button>
    </MantineProvider>
  );
}

export default App;
