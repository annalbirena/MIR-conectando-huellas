/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  FileInput,
  Group,
  Modal,
  rem,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPhotoScan } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import AgeInput from '../../AgeInput';
import MapCard from '../../MapCard';

function EditAdoptionPetForm({ data, isOpen, close, onClose }) {
  const [location, setLocation] = useState(data.pet.location);
  const [checked, setChecked] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      pet: {
        name: data.pet.name,
        specie: data.pet.specie,
        age: {
          number: data.pet.age.number,
          type: data.pet.age.type,
        },
        sex: data.pet.sex,
        breed: data.pet.breed || '',
        size: data.pet.size,
        location: data.pet.location,
        state: data.pet.state,
        image: null,
        description: data.pet.description || '',
      },
      contact: {
        name: data.contact.name,
        phone: data.contact.phone,
        address: data.contact.address,
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
    }
  };

  useEffect(() => {
    const isChecked = checked;
    onSetDefaultDirection(isChecked);
  }, [checked]);

  useEffect(() => {
    form.setFieldValue('pet.location', location);
  }, [location]);

  const handleSubmit = (values) => {
    console.log(values);

    // Resetear valores
    form.reset();
    setChecked(false);

    close();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={
        <Text size="xl" fw="bold">
          Editar Mascota
        </Text>
      }
      size="xl"
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
                { value: 'dog', label: 'Perro' },
                { value: 'cat', label: 'Gato' },
                { value: 'other', label: 'Otro' },
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
              Ubicación de mascota en adopción
              <Text span c="red">
                *
              </Text>
            </Text>
            <MapCard location={location} setLocation={setLocation} />
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
            <Button type="submit">Actualizar datos</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

EditAdoptionPetForm.propTypes = {
  data: PropTypes.shape({
    pet: PropTypes.shape({
      name: PropTypes.string.isRequired,
      specie: PropTypes.string.isRequired,
      age: PropTypes.shape({
        number: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }),
      sex: PropTypes.string.isRequired,
      breed: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      lostDate: PropTypes.string,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }).isRequired,
      state: PropTypes.string.isRequired,
      image: PropTypes.shape().isRequired,
      description: PropTypes.string.isRequired,
    }),
    contact: PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }),
    userId: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditAdoptionPetForm;
