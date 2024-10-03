import React from 'react';
import { Title, Stack, Text, Input, Button } from '@mantine/core';
import AppLayout from '../components/AppLayout';

function Login() {
  return (
    <AppLayout>
      <Stack align="center">
        <Title>Inicia Sesión</Title>
        <Text size="xs">¿No tienes cuenta? Registrate.</Text>
        <Input.Wrapper label="Correo" withAsterisk>
          <Input placeholder="Correo" />
        </Input.Wrapper>
        <Input.Wrapper label="Contraseña" withAsterisk>
          <Input placeholder="Contraseña" />
        </Input.Wrapper>
        <Text size="xs">¿Olvidaste tu contraseña?</Text>
        <Button variant="filled">Iniciar Sesión</Button>
      </Stack>
    </AppLayout>
  );
}

export default Login;
