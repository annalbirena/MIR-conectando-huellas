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
import { DateInput } from '@mantine/dates';
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconPhotoScan,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import PropTypes from 'prop-types';
import AgeInput from '../../AgeInput';
import MapCard from '../../MapCard';
import { useUserContext } from '../../../context/UserContext';
import { getLostPetsByUserId, updateLostPet } from '../../../services/pets';
import 'dayjs/locale/es';

function EditLostPetForm({ data, isOpen, close, onClose, setPetsData }) {
  const petLocation = {
    latitude: data.pet.location_latitude,
    longitude: data.pet.location_longitude,
  };

  const [location, setLocation] = useState(petLocation);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { species, user, userId, token } = useUserContext();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      pet: {
        name: data.pet.name,
        specie: data.pet.specieId,
        age: {
          number: data.pet.age,
          type: data.pet.ageUnit,
        },
        sex: data.pet.sex,
        breed: data.pet.breed || '',
        size: data.pet.size,
        lostDate: new Date(data.lostDate),
        location: petLocation,
        state: data.statusLost === true ? 'lost' : 'found',
        image: data.pet.image,
        description: data.description || '',
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
        specie: (value) =>
          value.length < 2 ? 'Debe seleccionar un tipo' : null,
        age: {
          number: (value) => (value > 0 ? null : 'Debe ingresar la edad'),
        },
        sex: (value) => (value.length < 2 ? 'Debe seleccionar el sexo' : null),
        size: (value) =>
          value.length < 2 ? 'Debe seleccionar el tamaño' : null,
        lostDate: (value) =>
          value === null ? 'Debe seleccionar una fecha' : null,
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

    transformValues: (values) => ({
      pet: {
        ...values.pet,
        state: values.pet.state === 'lost',
      },
      contact: values.contact,
    }),
  });

  const onSetDefaultDirection = (isChecked) => {
    if (isChecked) {
      form.setFieldValue('contact.name', user.name);
      form.setFieldValue('contact.phone', user.phone);
      form.setFieldValue('contact.address', user.address);
    } else {
      form.setFieldValue('contact.name', data.contact.name);
      form.setFieldValue('contact.phone', data.contact.phone);
      form.setFieldValue('contact.address', data.contact.address);
    }
  };

  useEffect(() => {
    const isChecked = checked;
    onSetDefaultDirection(isChecked);
  }, [checked]);

  useEffect(() => {
    form.setFieldValue('pet.location', location);
  }, [location]);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const updatedPet = await updateLostPet(data.id, values, token);
      if (updatedPet) {
        notifications.show({
          title: 'Exito!',
          message: 'Se actualizaron los datos de la mascota.',
          icon: <IconCheck size={20} />,
        });

        // Obtener mascotas actualizadas
        const userPets = await getLostPetsByUserId(userId, token);
        setPetsData(userPets);

        // Resetear valores
        form.reset();
        setLoading(false);
        setLocation(petLocation);
        setChecked(false);
        close();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
            <DateInput
              withAsterisk
              locale="es"
              label="Fecha de perdida"
              placeholder="Seleccione fecha"
              previousIcon={<IconChevronLeft size={18} />}
              nextIcon={<IconChevronRight size={18} />}
              key={form.key('pet.lostDate')}
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
              key={form.key('pet.state')}
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
            key={form.key('pet.image')}
            {...form.getInputProps('pet.image')}
          />

          <Stack gap={4}>
            <Text fw={500} size="sm">
              Ubicación de lugar de perdida
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
            <Button type="submit" loading={loading}>
              Actualizar datos
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

EditLostPetForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    lostDate: PropTypes.string,
    statusLost: PropTypes.bool,
    statusAdopt: PropTypes.bool,
    description: PropTypes.string.isRequired,
    pet: PropTypes.shape({
      name: PropTypes.string.isRequired,
      specieId: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      ageUnit: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      breed: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      location_latitude: PropTypes.number.isRequired,
      location_longitude: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
    contact: PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  setPetsData: PropTypes.func.isRequired,
};

export default EditLostPetForm;
