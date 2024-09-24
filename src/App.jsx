import '@mantine/core/styles.css';
import { MantineProvider, Title } from '@mantine/core';
import theme from './theme';

function App() {
  return (
    <MantineProvider theme={theme}>
      <Title>Conectando Huellas</Title>
    </MantineProvider>
  );
}

export default App;
