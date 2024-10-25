/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React, { useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { IconCheck, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import AppLayout from '../../components/AppLayout';
import { authenticateUser } from '../../services/user';
import { useUserContext } from '../../context/UserContext';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUserId } = useUserContext();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Correo inválido'),
      password: (val) =>
        val.length <= 7 ? 'Debe tener al menos 8 carácteres' : null,
    },
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const responseData = await authenticateUser(
        values.email,
        values.password,
      );

      const { user, token } = responseData;

      if (user) {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('token', token);
        setUserId(user.id);
        setToken(token);

        notifications.show({
          title: 'Éxito!',
          message: 'Inicio de sesión correcto.',
          icon: <IconCheck size={20} />,
        });

        form.reset();
        setIsLoading(false);
        // Redirigir al perfil de usuario
        navigate('/mi-cuenta/datos-personales');
      } else {
        notifications.show({
          title: 'Error!',
          message: 'Usuario o contraseña incorrectos.',
          color: 'red',
          icon: <IconX size={20} />,
        });
        setIsLoading(false);
      }
    } catch (error) {
      notifications.show({
        title: 'Error!',
        message: 'Hubo un error al iniciar sesión',
        color: 'red',
        icon: <IconX size={20} />,
      });
      setIsLoading(false);
    }
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
            <Button type="submit" w="100%" loading={isLoading}>
              Inicia Sesión
            </Button>
          </Group>
        </form>
      </Paper>
    </AppLayout>
  );
}

export default LoginPage;
