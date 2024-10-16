/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React from 'react';
import {
  Stack,
  Button,
  Paper,
  Group,
  TextInput,
  PasswordInput,
  Title,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

function LoginPage() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Correo inválido'),
      password: (val) =>
        val.length <= 6 ? 'Debe tener al menos 6 carácteres' : null,
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <AppLayout>
      <Paper radius="md" p="xl" w={400} m="auto" withBorder>
        <Title order={1} fw={600} mb="sm" ta="center">
          Inicia Sesión
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Group gap={4} justify="center">
              <Text size="sm">¿No tienes una cuenta?</Text>
              <Link to="/registrar-usuario" style={{ textDecoration: 'none' }}>
                <Text size="sm" c="purpleBrand.4">
                  Registrate
                </Text>
              </Link>
            </Group>

            <TextInput
              withAsterisk
              label="Correo"
              placeholder="correo@email.com"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              withAsterisk
              label="Contraseña"
              placeholder="Contraseña"
              {...form.getInputProps('password')}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Button type="submit" w="100%">
              Inicia Sesión
            </Button>
          </Group>
        </form>
      </Paper>
    </AppLayout>
  );
}

export default LoginPage;
