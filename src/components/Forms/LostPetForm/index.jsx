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
  Divider,
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
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconPhotoScan,
  IconX,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import MapCard from '../../MapCard';
import AgeInput from '../../AgeInput';
import { createLostPet, uploadPetImage } from '../../../services/pets';
import { useUserContext } from '../../../context/UserContext';
import 'dayjs/locale/es';
import classes from '../form.module.css';

function LostPetForm({ species }) {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const { userId, token, user } = useUserContext();

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
          value.length < 9
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
    setLoading(true);
    setLocationError(false);

    try {
      // Formatear imagen
      const formatImage = new FormData();
      formatImage.append('image', values.pet.image);

      // Cargar imagen
      const imageResponse = await uploadPetImage(formatImage, token);

      if (imageResponse) {
        const formValues = {
          ...values,
          pet: {
            ...values.pet,
            image: imageResponse.secure_url,
            imageId: imageResponse.public_id,
          },
        };

        // Crear mascota
        const addedPet = await createLostPet(formValues, token);
        if (addedPet) {
          notifications.show({
            title: 'Mascota registrada',
            message: 'Se registró tu mascota perdida',
            icon: <IconCheck size={20} />,
          });

          form.reset();
          setLocation(null);
          setChecked(false);
        } else {
          notifications.show({
            title: 'Error!',
            message: 'Hubo un error al crear la mascota, intenta nuevamente.',
            color: 'red',
            icon: <IconX size={20} />,
          });
        }
      } else {
        notifications.show({
          title: 'Error!',
          message: 'Hubo un error al cargar la imagen, intenta nuevamente.',
          color: 'red',
          icon: <IconX size={20} />,
        });
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Error!',
        message: `Hubo un error al crear la mascota: ${error}'`,
        color: 'red',
        icon: <IconX size={20} />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <Stack gap="xl">
        <Stack>
          <Divider
            color="purpleBrand.2"
            label="Datos de Mascota"
            labelPosition="left"
          />
          <Group grow wrap="nowrap" className={classes.row}>
            <TextInput
              withAsterisk
              label="Nombre de mascota"
              placeholder="Ingrese nombre de mascota"
              key={form.key('pet.name')}
              {...form.getInputProps('pet.name')}
              className={classes.input}
            />
            <Select
              withAsterisk
              allowDeselect={false}
              label="Tipo"
              placeholder="Seleccione tipo"
              data={species}
              key={form.key('pet.specie')}
              {...form.getInputProps('pet.specie')}
              className={classes.input}
            />
          </Group>
          <Group grow wrap="nowrap" className={classes.row}>
            <AgeInput form={form} />
            <Select
              withAsterisk
              allowDeselect={false}
              label="Sexo"
              placeholder="Seleccione sexo"
              data={[
                { value: 'female', label: 'Hembra' },
                { value: 'male', label: 'Macho' },
              ]}
              key={form.key('pet.sex')}
              {...form.getInputProps('pet.sex')}
              className={classes.input}
            />
            <TextInput
              label="Raza"
              placeholder="Ingrese raza"
              key={form.key('pet.breed')}
              {...form.getInputProps('pet.breed')}
              className={classes.input}
            />
            <Select
              withAsterisk
              allowDeselect={false}
              label="Tamaño"
              placeholder="Seleccione tamaño"
              data={[
                { value: 'small', label: 'Pequeño' },
                { value: 'medium', label: 'Mediano' },
                { value: 'large', label: 'Grande' },
              ]}
              key={form.key('pet.size')}
              {...form.getInputProps('pet.size')}
              className={classes.input}
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
          <Textarea
            autosize
            minRows={2}
            label="Descripción adicional"
            placeholder="Ingrese descripción"
            key={form.key('pet.description')}
            {...form.getInputProps('pet.description')}
          />
        </Stack>

        <Stack>
          <Divider
            color="purpleBrand.2"
            label="Datos de Pérdida"
            labelPosition="left"
          />
          <Group grow wrap="nowrap" className={classes.row}>
            <DateInput
              withAsterisk
              locale="es"
              label="Fecha de pérdida"
              placeholder="Seleccione fecha"
              previousIcon={<IconChevronLeft size={18} />}
              nextIcon={<IconChevronRight size={18} />}
              key={form.key('pet.lostDate')}
              {...form.getInputProps('pet.lostDate')}
              className={classes.input}
            />
            <Select
              withAsterisk
              allowDeselect={false}
              disabled
              label="Estado"
              placeholder="Seleccione estado"
              data={[
                { value: 'lost', label: 'Perdido' },
                { value: 'found', label: 'Encontrado' },
              ]}
              key={form.key('pet.state')}
              {...form.getInputProps('pet.state')}
              className={classes.input}
            />
          </Group>

          <Stack gap={4}>
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
        </Stack>

        <Stack>
          <Divider
            color="purpleBrand.2"
            label="Datos de Contacto"
            labelPosition="left"
          />
          <Checkbox
            label="Usar dirección de usuario registrada"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
          <Group grow wrap="nowrap" className={classes.row}>
            <TextInput
              withAsterisk
              label="Nombre de Contacto"
              placeholder="Nombre de Contacto"
              key={form.key('contact.name')}
              {...form.getInputProps('contact.name')}
              className={classes.input}
            />
            <TextInput
              withAsterisk
              label="Celular de Contacto"
              placeholder="Ingrese Celular"
              key={form.key('contact.phone')}
              {...form.getInputProps('contact.phone')}
              className={classes.input}
            />
          </Group>
          <TextInput
            withAsterisk
            label="Dirección de Contacto"
            placeholder="Ingrese Dirección"
            key={form.key('contact.address')}
            {...form.getInputProps('contact.address')}
          />
        </Stack>

        <Group justify="flex-end">
          <Button type="submit" loading={loading}>
            Registrar mascota
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default LostPetForm;
