/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { useEffect, useState } from 'react';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useUserContext } from '../../../context/UserContext';

function UserForm() {
  const { user } = useUserContext();
  const [enableSubmit, setEnableSubmit] = useState(true);

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

  const handleSubmit = (values) => {
    console.log(values);
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
      console.log();
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
        <Group grow>
          <TextInput
            withAsterisk
            disabled
            label="Correo"
            placeholder="correo@email.com"
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Celular"
            placeholder="999111999"
            {...form.getInputProps('phone')}
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
        <Button type="submit" disabled={enableSubmit}>
          Guardar Datos
        </Button>
      </Group>
    </form>
  );
}

export default UserForm;
