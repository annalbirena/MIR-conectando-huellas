/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import React, { useEffect, useState } from 'react';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useUserContext } from '../../../context/UserContext';
import { getUserById, updateUser } from '../../../services/user';
import classes from '../form.module.css';

function UserForm() {
  const { user, setUser, token } = useUserContext();
  const [enableSubmit, setEnableSubmit] = useState(true);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },

    validate: {
      name: (value) =>
        value.length < 2 ? 'Debe tener al menos 3 carácteres' : null,
      email: isEmail('Correo inválido'),
      phone: (val) => (/^\d{9,15}$/.test(val) ? null : 'Celular inválido'),
      address: (value) =>
        value.length < 5 ? 'Debe tener al menos 6 carácteres' : null,
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);

    const data = {
      name: values.name,
      phone: values.phone,
      address: values.address,
    };

    try {
      const userUpdated = await updateUser(user.id, data, token);

      if (userUpdated) {
        setLoading(false);
        notifications.show({
          title: 'Éxito!',
          message: 'Datos actualizados correctamente.',
          icon: <IconCheck size={20} />,
        });

        // Obtener datos actualizados del usuario
        const getUser = async (id) => {
          const userData = await getUserById(id);
          setUser(userData);
        };

        getUser(user.id);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      notifications.show({
        title: 'Error!',
        message: 'Hubo un erro al actualizar los datos, intenta nuevamente.',
        icon: <IconX size={20} />,
      });
    }
  };

  // Inicializar los valores del formulario con los datos del usuario
  useEffect(() => {
    if (user) {
      const data = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      };
      form.setInitialValues(data);
      form.setValues(data);
    }
  }, [user]);

  // Habilitar el guadar cambios solo si cambian los datos
  useEffect(() => {
    const values = form.getValues();
    if (
      user &&
      (values.name !== user?.name ||
        values.phone !== user?.phone ||
        values.address !== user?.address)
    ) {
      setEnableSubmit(false);
    } else {
      setEnableSubmit(true);
    }
  }, [form, user]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Nombre"
          placeholder="Ingresa tu nombre"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <Group grow wrap="nowrap" className={classes.row}>
          <TextInput
            disabled
            label="Correo"
            placeholder="correo@email.com"
            {...form.getInputProps('email')}
            className={classes.input}
          />
          <TextInput
            withAsterisk
            label="Celular"
            placeholder="999111999"
            {...form.getInputProps('phone')}
            className={classes.input}
          />
        </Group>
        <TextInput
          withAsterisk
          label="Dirección"
          placeholder="Ingresa tu dirección"
          {...form.getInputProps('address')}
        />
      </Stack>

      <Group mt="xl" justify="flex-end">
        <Button type="submit" disabled={enableSubmit} loading={loading}>
          Guardar Datos
        </Button>
      </Group>
    </form>
  );
}

export default UserForm;
