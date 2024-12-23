import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import App from './App';
import theme from './theme';
import '@mantine/notifications/styles.css';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <MantineProvider theme={theme}>
        <Notifications />
        <App />
      </MantineProvider>
    </UserProvider>
  </StrictMode>,
);
