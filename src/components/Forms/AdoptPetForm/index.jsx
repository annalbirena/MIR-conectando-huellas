/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  FileInput,
  Group,
  rem,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { IconCheck, IconPhotoScan } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import MapCard from '../../MapCard';
import AgeInput from '../../AgeInput';
import { createAdoptPet } from '../../../services/pets';
import { useUserContext } from '../../../context/UserContext';

function AdoptPetForm({ species }) {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [checked, setChecked] = useState(false);
  const { userId } = useUserContext();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      pet: {
        name: '',
        specie: '', // dog / cat / other
        age: {
          number: 0,
          type: 'year', // year / month
        },
        sex: '', // female / male
        breed: '', // raza
        size: '', // small / medium / large
        location: null,
        state: 'available', // available / adopted
        image: null,
        description: '',
      },
      contact: {
        name: '',
        phone: '',
        address: '',
      },
      userId,
    },

    validate: {
      pet: {
        name: (value) =>
          value.length < 2 ? 'Nombre debe tener al menos 3 carácteres' : null,
        specie: (value) =>
          value.length < 2 ? 'Debe seleccionar un tipo' : null,
        age: {
          number: (value) => (value > 0 ? null : 'Debe ingresar la edad'),
        },
        sex: (value) => (value.length < 2 ? 'Debe seleccionar el sexo' : null),
        size: (value) =>
          value.length < 2 ? 'Debe seleccionar el tamaño' : null,
        image: (value) => (value === null ? 'Debe cargar una foto' : null),
        location: (value) => (value === null ? 'Error' : null),
      },
      contact: {
        name: (value) =>
          value.length < 2 ? 'Nombre debe tener al menos 3 carácteres' : null,
        phone: (value) =>
          value.length < 8 ? 'Celular debe tener al menos 9 carácteres' : null,
        address: (value) =>
          value.length < 2
            ? 'Dirección debe tener al menos 10 carácteres'
            : null,
      },
    },
  });

  const onSetDefaultDirection = (isChecked) => {
    if (isChecked) {
      form.setFieldValue('contact.name', 'Jane');
      form.setFieldValue('contact.phone', '999165999');
      form.setFieldValue('contact.address', 'Av. 7 de Abril 2020, Lima');
    } else {
      form.setFieldValue('contact.name', '');
      form.setFieldValue('contact.phone', '');
      form.setFieldValue('contact.address', '');
    }
  };

  useEffect(() => {
    const isChecked = checked;
    onSetDefaultDirection(isChecked);
  }, [checked]);

  useEffect(() => {
    form.setFieldValue('pet.location', location);
  }, [location]);

  const handleError = (errors) => {
    if (errors['pet.location']) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }
  };

  const handleSubmit = async (values) => {
    setLocationError(false);

    try {
      const addedPet = await createAdoptPet(values);

      if (addedPet) {
        notifications.show({
          title: 'Mascota registrada',
          message: 'Se registro tu mascota en adopción',
          icon: <IconCheck size={20} />,
        });

        // Resetear valores
        form.reset();
        setLocation(null);
        setChecked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <Stack>
        <Group grow align="flex-start">
          <TextInput
            withAsterisk
            label="Nombre de mascota"
            placeholder="Ingrese nombre de mascota"
            key={form.key('pet.name')}
            {...form.getInputProps('pet.name')}
          />
          <Select
            withAsterisk
            label="Tipo"
            placeholder="Seleccione tipo"
            data={species}
            key={form.key('pet.specie')}
            {...form.getInputProps('pet.specie')}
          />
        </Group>
        <Group grow align="flex-start">
          <AgeInput form={form} />
          <Select
            withAsterisk
            label="Sexo"
            placeholder="Seleccione sexo"
            data={[
              { value: 'female', label: 'Hembra' },
              { value: 'male', label: 'Macho' },
            ]}
            key={form.key('pet.sex')}
            {...form.getInputProps('pet.sex')}
          />
          <TextInput
            label="Raza"
            placeholder="Ingrese raza"
            key={form.key('pet.breed')}
            {...form.getInputProps('pet.breed')}
          />
          <Select
            withAsterisk
            label="Tamaño"
            placeholder="Seleccione tamaño"
            data={[
              { value: 'small', label: 'Pequeño' },
              { value: 'medium', label: 'Mediano' },
              { value: 'large', label: 'Grande' },
            ]}
            key={form.key('pet.size')}
            {...form.getInputProps('pet.size')}
          />
        </Group>
        <Group grow align="flex-start">
          <FileInput
            withAsterisk
            label="Cargar imagen"
            placeholder="Seleccione imagen desde su equipo"
            leftSectionPointerEvents="none"
            leftSection={
              <IconPhotoScan
                style={{
                  width: rem(18),
                  height: rem(18),
                }}
                stroke={1.5}
              />
            }
            key={form.key('pet.image')}
            {...form.getInputProps('pet.image')}
          />
          <Select
            withAsterisk
            label="Estado"
            placeholder="Seleccione estado"
            data={[
              { value: 'available', label: 'En Adopción' },
              { value: 'adopted', label: 'Adoptado' },
            ]}
            key={form.key('pet.state')}
            {...form.getInputProps('pet.state')}
          />
        </Group>

        <Stack gap={4}>
          <Text fw={500} size="sm">
            Ubicación de mascota en adopción{' '}
            <Text span c="red">
              *
            </Text>
          </Text>
          <MapCard location={location} setLocation={setLocation} />
          {locationError && (
            <Text c="red" size="xs">
              Seleccionar ubicación en mapa
            </Text>
          )}
        </Stack>
        <Textarea
          autosize
          minRows={2}
          label="Descripción adicional"
          placeholder="Ingrese descripción"
          key={form.key('pet.description')}
          {...form.getInputProps('pet.description')}
        />
        <Checkbox
          label="Usar dirección de usuario registrada"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <Group grow align="flex-start">
          <TextInput
            withAsterisk
            label="Nombre de Contacto"
            placeholder="Nombre de Contacto"
            key={form.key('contact.name')}
            {...form.getInputProps('contact.name')}
          />
          <TextInput
            withAsterisk
            label="Celular de Contacto"
            placeholder="Ingrese Celular"
            key={form.key('contact.phone')}
            {...form.getInputProps('contact.phone')}
          />
        </Group>
        <TextInput
          withAsterisk
          label="Dirección de Contacto"
          placeholder="Ingrese Dirección"
          key={form.key('contact.address')}
          {...form.getInputProps('contact.address')}
        />

        <Group mt="lg" justify="flex-end">
          <Button type="submit">Registrar mascota</Button>
        </Group>
      </Stack>
    </form>
  );
}

export default AdoptPetForm;
