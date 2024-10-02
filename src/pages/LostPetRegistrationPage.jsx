/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import {
  Button,
  Checkbox,
  FileInput,
  Group,
  Input,
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
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      pet: {
        name: '',
        type: '',
        age: {
          number: 0,
          type: '',
        },
        sex: '',
        breed: '', // raza
        size: '',
        lostDate: null, // valor inicial?
        lostlocation: {
          latitude: 0,
          longitude: 0,
        },
        state: 'perdido',
        image: '', // valor inicial?
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
      },
    },
  });

  return (
    <AppLayout>
      <Stack>
        <TitlePage
          text="Registro de"
          image="src/assets/images/lost-pet-text.svg"
          imagePosition="right"
        />

        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
              leftSection={
                <IconPhotoScan
                  style={{
                    width: rem(18),
                    height: rem(18),
                  }}
                  stroke={1.5}
                />
              }
              label="Cargar imagen"
              placeholder="Seleccione imagen desde su equipo"
              withAsterisk
              leftSectionPointerEvents="none"
            />
            <Checkbox label="Usar dirección de usuario registrada" />
            <Group grow align="flex-start">
              <Input.Wrapper label="Nombre de Contacto" withAsterisk>
                <Input placeholder="Ingrese Nombre" />
              </Input.Wrapper>
              <Input.Wrapper label="Teléfono de Contacto" withAsterisk>
                <Input placeholder="Ingrese Teléfono" />
              </Input.Wrapper>
            </Group>
            <Input.Wrapper label="Dirección de Contacto" withAsterisk>
              <Input placeholder="Ingrese Dirección" />
            </Input.Wrapper>
            <Group grow align="flex-start">
              <Stack gap={4}>
                <Text fw={500} size="sm">
                  Ubicación de lugar de perdida{' '}
                  <Text span c="red">
                    *
                  </Text>
                </Text>
                <MapCard />
              </Stack>
              <Textarea
                label="Descripción adicional"
                placeholder="Ingrese descripción"
              />
            </Group>

            <Group mt="xl" justify="flex-end">
              <Button type="submit">Guardar datos</Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </AppLayout>
  );
}

export default LostPetRegistrationPage;
