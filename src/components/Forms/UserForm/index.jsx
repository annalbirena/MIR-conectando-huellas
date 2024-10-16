/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

function UserForm() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },

    validate: {
      name: (value) =>
        value.length < 3 ? 'Debe tener al menos 3 carácteres' : null,
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Correo inválido'),
      phone: (val) => (/^\d{9,15}$/.test(val) ? null : 'Celular inválido'),
      address: (value) =>
        value.length < 3 ? 'Debe tener al menos 6 carácteres' : null,
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Nombre"
          placeholder="Ingresa tu nombre"
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
        <Button type="submit">Guardar Datos</Button>
      </Group>
    </form>
  );
}

export default UserForm;
