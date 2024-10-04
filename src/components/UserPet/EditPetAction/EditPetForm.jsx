/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Button,
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
import { DateInput } from '@mantine/dates';
import { IconPhotoScan } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import AgeInput from '../../AgeInput';
import PetMapCard from '../../PetMapCard';

function EditPetForm({ data, isOpen, close, onClose }) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      pet: {
        name: data.name,
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

  const handleSubmit = (values) => {
    console.log(values);
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
            <PetMapCard />
          </Stack>
          <Textarea
            autosize
            minRows={2}
            label="Descripción adicional"
            placeholder="Ingrese descripción"
            {...form.getInputProps('pet.description')}
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

          <Group mt="lg" justify="flex-end">
            <Button type="submit">Actualizar datos</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

EditPetForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    lostDate: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditPetForm;
