import React from 'react';
import { Title, Stack, Text, Input, Button } from '@mantine/core';
import AppLayout from '../components/AppLayout';

function Registration() {
  return (
    <AppLayout>
      <Stack align="center">
        <Title>Registrate</Title>
        <Text size="xs">¿Tienes una cuenta? Inicia Sesión</Text>
        <Input.Wrapper label="Nombre" withAsterisk>
          <Input placeholder="Nombre" />
        </Input.Wrapper>
        <Input.Wrapper label="Correo" withAsterisk>
          <Input placeholder="Correo" />
        </Input.Wrapper>
        <Input.Wrapper label="Contraseña" withAsterisk>
          <Input placeholder="Contraseña" />
        </Input.Wrapper>
        <Input.Wrapper label="Telefono" withAsterisk>
          <Input placeholder="Telefono" />
        </Input.Wrapper>
        <Input.Wrapper label="Dirección" withAsterisk>
          <Input placeholder="Dirección" />
        </Input.Wrapper>
        <Button variant="filled">Registrar</Button>
      </Stack>
    </AppLayout>
  );
}

export default Registration;
