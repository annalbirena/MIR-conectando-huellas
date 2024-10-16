/* eslint-disable no-console */
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
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { createUser, getUserIdByEmail } from '../../services/user';

function SignupPage() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
    },

    validate: {
      name: (value) =>
        value.length < 3 ? 'Debe tener al menos 3 carácteres' : null,
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Correo inválido'),
      password: (val) =>
        val.length <= 5 ? 'Debe tener al menos 6 carácteres' : null,
      phone: (val) => (/^\d{9,15}$/.test(val) ? null : 'Celular inválido'),
      address: (value) =>
        value.length < 3 ? 'Debe tener al menos 6 carácteres' : null,
    },
  });

  const handleSubmit = async (values) => {
    const userId = await getUserIdByEmail(values.email);
    if (userId) {
      notifications.show({
        title: 'Correo ya existe',
        message: 'Este correo ya está registrado.',
        color: 'red',
        icon: <IconX size={20} />,
      });
      return;
    }

    try {
      const user = await createUser(values);

      if (user) {
        notifications.show({
          title: 'Usuario registrado',
          message: 'Se registro el usuario',
          icon: <IconCheck size={20} />,
        });

        // Redirigir al perfil de usuario
        form.reset();
        navigate('/mi-cuenta/datos-personales');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout>
      <Paper radius="md" p="xl" w={400} m="auto" withBorder>
        <Title order={1} fw={600} mb="sm" ta="center">
          Registrate
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Group gap={4} justify="center">
              <Text size="sm">¿Tienes una cuenta?</Text>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Text size="sm" c="purpleBrand.4">
                  Inicia sesión
                </Text>
              </Link>
            </Group>

            <TextInput
              withAsterisk
              label="Nombre"
              placeholder="Ingresa tu nombre"
              {...form.getInputProps('name')}
            />
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
            <TextInput
              label="Celular"
              placeholder="999111999"
              rightSection={null}
              {...form.getInputProps('phone')}
            />
            <TextInput
              withAsterisk
              label="Dirección"
              placeholder="Ingresa tu dirección"
              {...form.getInputProps('address')}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Button type="submit" w="100%">
              Registrar
            </Button>
          </Group>
        </form>
      </Paper>
    </AppLayout>
  );
}

export default SignupPage;
