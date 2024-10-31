/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
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
  Center,
  Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { createUser, getUserIdByEmail } from '../../services/user';

const requirements = [
  'Mínimo 8 caracteres',
  'Al menos una mayúscula',
  'Al menos un número',
  'Al menos un carácter especial',
];

function PasswordRequirement({ label }) {
  return (
    <Text component="div" c="dark" mt={5} size="xs">
      <Center inline>
        <IconCheck size="0.9rem" stroke={1.5} />
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

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
      password: (val) => {
        const errors = [];

        if (val.length < 8) {
          errors.push('Debe tener al menos 8 carácteres');
        }
        if (!/[A-Z]/.test(val)) {
          errors.push('Debe tener al menos una mayuscula');
        }
        if (!/[0-9]/.test(val)) {
          errors.push('Debe tener al menos un número');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) {
          errors.push('Debe tener al menos carácter especial');
        }

        return errors.length > 0 ? errors.join(', ') : null; // Unir errores como un string
      },
      phone: (val) => (/^\d{9,15}$/.test(val) ? null : 'Celular inválido'),
      address: (value) =>
        value.length < 3 ? 'Debe tener al menos 6 carácteres' : null,
    },
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const userId = await getUserIdByEmail(values.email);

    if (userId) {
      notifications.show({
        title: '¡Correo ya existe!',
        message: `El correo ${values.email} ya está registrado.`,
        color: 'red',
        icon: <IconX size={20} />,
      });
      setIsLoading(false);
      return;
    }

    try {
      const user = await createUser(values);

      if (user) {
        notifications.show({
          title: '¡Usuario registrado!',
          message: 'Se envió un correo electrónico para validar su cuenta.',
          icon: <IconCheck size={20} />,
        });

        // Resetear formulario
        form.reset();
        setIsLoading(false);
      } else {
        notifications.show({
          title: 'Error!',
          message: 'No se pudo crear el usuario, intenta nuevamente.',
          icon: <IconX size={20} />,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      notifications.show({
        title: 'Error!',
        message: 'No se pudo crear el usuario, intenta nuevamente.',
        icon: <IconX size={20} />,
      });
      setIsLoading(false);
    }
  };

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement} />
  ));

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
            <Stack gap={4}>
              <PasswordInput
                withAsterisk
                label="Contraseña"
                placeholder="Contraseña"
                {...form.getInputProps('password')}
              />
              <Stack gap={0}>{checks}</Stack>
            </Stack>
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
            <Button type="submit" w="100%" loading={isLoading}>
              Registrar
            </Button>
          </Group>
        </form>
      </Paper>
    </AppLayout>
  );
}

export default SignupPage;
