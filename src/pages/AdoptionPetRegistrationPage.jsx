/* eslint-disable react/jsx-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from 'react';
import {
  Breadcrumbs,
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
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';
import AgeInput from '../components/AgeInput';
import MapCard from '../components/MapCard';

function AdoptionPetRegistrationPage() {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [checked, setChecked] = useState(false);

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
        location: null,
        state: 'enAdopcion',
        /* image: null, */
        image:
          'https://media.es.wired.com/photos/65845b5ea4076464da362974/16:9/w_2560%2Cc_limit/Science-Life-Extension-Drug-for-Big-Dogs-Is-Getting-Closer-1330545769.jpg',
        description: '',
      },
      contact: {
        name: '',
        phone: '',
        address: '',
      },
      userId: '123456',
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
      const res = await fetch('http://localhost:8080/api/lostPetData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log(res);

      if (res.ok) {
        notifications.show({
          title: 'Mascota registrada',
          message: 'Se registro tu mascota perdida',
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
    <AppLayout>
      <Stack gap={0}>
        <Breadcrumbs pb="xl">
          <Link to="/registro">
            <Text c="purpleBrand.4" fw={500} size="lg">
              Registro
            </Text>
          </Link>
          <Text fw={500} size="lg">
            Registro de Mascota en Adopción
          </Text>
        </Breadcrumbs>

        <TitlePage
          text="Registro de"
          image="/src/assets/images/adoption-pet-text.svg"
          imagePosition="right"
        />

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
                data={[
                  { value: 'perro', label: 'Perro' },
                  { value: 'gato', label: 'Gato' },
                  { value: 'otro', label: 'Otro' },
                ]}
                key={form.key('pet.type')}
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
                  { value: 'pequeño', label: 'Pequeño' },
                  { value: 'mediano', label: 'Mediano' },
                  { value: 'grande', label: 'Grande' },
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
                /* key={form.key('pet.image')}
              {...form.getInputProps('pet.image')} */
              />
              <Select
                withAsterisk
                label="Estado"
                placeholder="Seleccione estado"
                data={[
                  { value: 'enAdopcion', label: 'En Adopción' },
                  { value: 'adoptado', label: 'Adoptado' },
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
      </Stack>
    </AppLayout>
  );
}

export default AdoptionPetRegistrationPage;
