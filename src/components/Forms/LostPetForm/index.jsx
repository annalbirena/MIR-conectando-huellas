/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
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
import { IconCheck, IconPhotoScan, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import MapCard from '../../MapCard';
import AgeInput from '../../AgeInput';
import { createLostPet, uploadImage } from '../../../services/pets';
import { useUserContext } from '../../../context/UserContext';
import 'dayjs/locale/es';

function LostPetForm({ species }) {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const { userId, token, user } = useUserContext();

  const form = useForm({
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
        lostDate: null,
        location: null,
        state: 'lost', // lost / found
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
          value.length < 2 ? 'Nombre debe tener al menos 3 caracteres' : null,
        specie: (value) => (value ? null : 'Debe seleccionar un tipo'),
        age: {
          number: (value) => (value > 0 ? null : 'Debe ingresar la edad'),
        },
        sex: (value) => (value ? null : 'Debe seleccionar el sexo'),
        size: (value) => (value ? null : 'Debe seleccionar el tamaño'),
        lostDate: (value) => (value ? null : 'Debe seleccionar una fecha'),
        image: (value) => (value ? null : 'Debe cargar una foto'),
        location: (value) => (value ? null : 'Debe seleccionar una ubicación'),
      },
      contact: {
        name: (value) =>
          value.length < 2 ? 'Nombre debe tener al menos 3 caracteres' : null,
        phone: (value) =>
          value.length < 8 ? 'Celular debe tener al menos 9 caracteres' : null,
        address: (value) =>
          value.length < 10
            ? 'Dirección debe tener al menos 10 caracteres'
            : null,
      },
    },

    transformValues: (values) => ({
      pet: {
        ...values.pet,
        state: values.pet.state === 'lost',
      },
      contact: values.contact,
      userId: userId,
    }),
  });

  const onSetDefaultDirection = (isChecked) => {
    if (isChecked) {
      form.setFieldValue('contact.name', user.name);
      form.setFieldValue('contact.phone', user.phone);
      form.setFieldValue('contact.address', user.address);
    } else {
      form.setFieldValue('contact.name', '');
      form.setFieldValue('contact.phone', '');
      form.setFieldValue('contact.address', '');
    }
  };

  useEffect(() => {
    onSetDefaultDirection(checked);
  }, [checked]);

  useEffect(() => {
    form.setFieldValue('pet.location', location);
  }, [location]);

  const handleSubmit = async (values) => {
    setLoading(true);
    setLocationError(false);

    try {
      const path = '/lostpets';
      const image = new FormData();
      image.append('image', values.pet.image);
      const imageUrl = await uploadImage(path, image, token);

      if (imageUrl) {
        const formValues = {
          ...values,
          pet: {
            ...values.pet,
            image: imageUrl,
          },
        };

        const addedPet = await createLostPet(formValues, token);
        if (addedPet) {
          notifications.show({
            title: 'Mascota registrada',
            message: 'Se registró tu mascota perdida',
            icon: <IconCheck size={20} />,
          });

          form.reset();
          setLoading(false);
          setLocation(null);
          setChecked(false);
        } else {
          setLoading(false);
          notifications.show({
            title: 'Error!',
            message: 'Hubo un error al crear la mascota, intenta nuevamente.',
            color: 'red',
            icon: <IconX size={20} />,
          });
        }
      } else {
        setLoading(false);
        notifications.show({
          title: 'Error!',
          message: 'Hubo un error al cargar la imagen, intenta nuevamente.',
          color: 'red',
          icon: <IconX size={20} />,
        });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      notifications.show({
        title: 'Error!',
        message: `Hubo un error al crear la mascota: ${error}'`,
        color: 'red',
        icon: <IconX size={20} />,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
            data={species}
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
              { value: 'small', label: 'Pequeño' },
              { value: 'medium', label: 'Mediano' },
              { value: 'large', label: 'Grande' },
            ]}
            {...form.getInputProps('pet.size')}
          />
        </Group>
        <Group grow align="flex-start">
          <DateInput
            withAsterisk
            locale="es"
            label="Fecha de perdida"
            placeholder="Seleccione fecha"
            {...form.getInputProps('pet.lostDate')}
          />
          <Select
            withAsterisk
            label="Estado"
            placeholder="Seleccione estado"
            data={[
              { value: 'lost', label: 'Perdido' },
              { value: 'found', label: 'Encontrado' },
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
        <Stack spacing={4}>
          <Text fw={500} size="sm">
            Ubicación de lugar de pérdida{' '}
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
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
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
        <Group mt="lg" position="right">
          <Button type="submit" loading={loading}>
            Registrar mascota
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default LostPetForm;
