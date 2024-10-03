/* eslint-disable react/jsx-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
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
import { DateInput } from '@mantine/dates';
import { IconPhotoScan } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';
import AgeInput from '../components/AgeInput';
import MapCard from '../components/MapCard';

function LostPetRegistrationPage() {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      pet: {
        name: '',
        type: '',
        age: {
          number: 0,
          type: 'year',
        },
        sex: '',
        breed: '', // raza
        size: '',
        lostDate: null,
        lostLocation: null,
        state: 'perdido',
        image: null,
        description: '',
      },
      contact: {
        name: '',
        phone: '',
        address: '',
      },
    },

    validate: {
      pet: {
        name: (value) =>
          value.length < 2 ? 'Nombre debe tener al menos 3 carácteres' : null,
        type: (value) => (value.length < 2 ? 'Debe seleccionar un tipo' : null),
        age: {
          number: (value) => (value > 0 ? null : 'Debe ingresar la edad'),
        },
        sex: (value) => (value.length < 2 ? 'Debe seleccionar el sexo' : null),
        size: (value) =>
          value.length < 2 ? 'Debe seleccionar el tamaño' : null,
        lostDate: (value) =>
          value === null ? 'Debe seleccionar una fecha' : null,
        image: (value) => (value === null ? 'Debe cargar una foto' : null),
        lostLocation: (value) => (value === null ? 'Error' : null),
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

  const onSetDefaultDirection = (checked) => {
    if (checked) {
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
    form.setFieldValue('pet.lostLocation', location);
  }, [location]);

  const handleError = (errors) => {
    if (errors['pet.lostLocation']) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }
  };

  const handleSubmit = (values) => {
    setLocationError(false);
    console.log(values);
  };

  return (
    <AppLayout>
      <Stack>
        <TitlePage
          text="Registro de"
          image="src/assets/images/lost-pet-text.svg"
          imagePosition="right"
        />

        <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
          <Stack>
            <Group grow align="flex-start">
              <TextInput
                withAsterisk
                label="Nombre de mascota"
                placeholder="Ingrese nombre de mascota"
                {...form.getInputProps('pet.name')}
              />
              <Select
                withAsterisk
                label="Tipo"
                placeholder="Seleccione tipo"
                data={[
                  { value: 'perro', label: 'Perro' },
                  { value: 'gato', label: 'Gato' },
                  { value: 'otro', label: 'Otro' },
                ]}
                {...form.getInputProps('pet.type')}
              />
            </Group>
            <Group grow align="flex-start">
              <AgeInput form={form} />
              <Select
                withAsterisk
                label="Sexo"
                placeholder="Seleccione sexo"
                data={[
                  { value: 'hembra', label: 'Hembra' },
                  { value: 'macho', label: 'Macho' },
                ]}
                {...form.getInputProps('pet.sex')}
              />
              <TextInput
                label="Raza"
                placeholder="Ingrese raza"
                {...form.getInputProps('pet.breed')}
              />
              <Select
                withAsterisk
                label="Tamaño"
                placeholder="Seleccione tamaño"
                data={[
                  { value: 'pequeño', label: 'Pequeño' },
                  { value: 'mediano', label: 'Mediano' },
                  { value: 'grande', label: 'Grande' },
                ]}
                {...form.getInputProps('pet.size')}
              />
            </Group>
            <Group grow align="flex-start">
              <DateInput
                withAsterisk
                label="Fecha de perdida"
                placeholder="Seleccione fecha"
                {...form.getInputProps('pet.lostDate')}
              />
              <Select
                withAsterisk
                label="Estado"
                placeholder="Seleccione estado"
                data={[
                  { value: 'perdido', label: 'Perdido' },
                  { value: 'encontrado', label: 'Encontrado' },
                ]}
                {...form.getInputProps('pet.state')}
              />
            </Group>
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
              {...form.getInputProps('pet.image')}
            />
            <Stack gap={4}>
              <Text fw={500} size="sm">
                Ubicación de lugar de perdida{' '}
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
              {...form.getInputProps('pet.description')}
            />
            <Checkbox
              label="Usar dirección de usuario registrada"
              onChange={(event) =>
                onSetDefaultDirection(event.currentTarget.checked)
              }
            />
            <Group grow align="flex-start">
              <TextInput
                withAsterisk
                label="Nombre de Contacto"
                placeholder="Nombre de Contacto"
                {...form.getInputProps('contact.name')}
              />
              <TextInput
                withAsterisk
                label="Celular de Contacto"
                placeholder="Ingrese Celular"
                {...form.getInputProps('contact.phone')}
              />
            </Group>
            <TextInput
              withAsterisk
              label="Dirección de Contacto"
              placeholder="Ingrese Dirección"
              {...form.getInputProps('contact.address')}
            />

            <Group mt="xl" justify="flex-end">
              <Button type="submit">Registrar mascota</Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </AppLayout>
  );
}

export default LostPetRegistrationPage;
