/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  BackgroundImage,
  Button,
  Center,
  Checkbox,
  FileButton,
  Group,
  Modal,
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
  IconX,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import PropTypes from 'prop-types';
import AgeInput from '../../AgeInput';
import MapCard from '../../MapCard';
import { useUserContext } from '../../../context/UserContext';
import {
  deletePetImage,
  getLostPetsByUserId,
  updateLostPet,
  uploadPetImage,
} from '../../../services/pets';
import 'dayjs/locale/es';

function EditLostPetForm({ data, isOpen, close, onClose, setPetsData }) {
  const petLocation = {
    latitude: data.pet.location_latitude,
    longitude: data.pet.location_longitude,
  };

  const [location, setLocation] = useState(petLocation);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);
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
        image: data.pet.imageUrl,
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

  const handleImageUpload = (file) => {
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result);
      };
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
      let imageResult = null;

      if (imageFile) {
        try {
          const deleteResponse = await deletePetImage(data.pet.id, token);

          if (deleteResponse) {
            const formatImage = new FormData();
            formatImage.append('image', imageFile);

            const uploadResponse = await uploadPetImage(formatImage, token);

            if (uploadResponse) {
              imageResult = {
                imageUrl: uploadResponse.secure_url,
                imageId: uploadResponse.public_id,
              };
            }
          }
        } catch (imageError) {
          console.error('Error al cargar la imagen:', imageError);
          notifications.show({
            title: 'Error',
            message: 'No se pudo actualizar la imagen de la mascota.',
            icon: <IconX size={20} />,
            color: 'red',
          });
        }
      }

      const formValues = {
        ...values,
        pet: {
          ...values.pet,
          image: imageResult ? imageResult.imageUrl : data.pet.imageUrl,
          imageId: imageResult ? imageResult.imageId : data.pet.imageId,
        },
      };

      // Actualizar los datos de la mascota
      const updatedPet = await updateLostPet(data.id, formValues, token);
      if (updatedPet) {
        notifications.show({
          title: 'Exito!',
          message: 'Se actualizaron los datos de la mascota.',
          icon: <IconCheck size={20} />,
        });

        // Obtener mascotas actualizadas
        const userPets = await getLostPetsByUserId(userId, token);
        setPetsData(userPets);

        close();
      }
    } catch (error) {
      console.error('Error al actualizar los datos de la mascota:', error);
      notifications.show({
        title: 'Error',
        message: 'Hubo un problema al actualizar los datos de la mascota.',
        icon: <IconX size={20} />,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset values
    form.reset();
    setLocation(petLocation);
    setChecked(false);
    setImageFile(null);
    setImageSrc(null);
    // Close Modal
    onClose();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
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
          <Group justify="stretch">
            <BackgroundImage
              h={300}
              flex={1}
              src={imageSrc || data.pet.imageUrl}
              radius="sm"
            >
              <Center p="md" h="100%">
                <FileButton
                  size="xs"
                  accept="image/png, image/gif, image/jpeg, image/svg+xml, image/webp, image/avif, image/heic, image/heif"
                  onChange={handleImageUpload}
                >
                  {(props) => <Button {...props}>Cargar foto</Button>}
                </FileButton>
              </Center>
            </BackgroundImage>
            <Stack flex={1}>
              <TextInput
                withAsterisk
                label="Nombre de mascota"
                placeholder="Ingrese nombre de mascota"
                key={form.key('pet.name')}
                {...form.getInputProps('pet.name')}
              />
              <Select
                withAsterisk
                allowDeselect={false}
                label="Tipo"
                placeholder="Seleccione tipo"
                data={species}
                key={form.key('pet.specie')}
                {...form.getInputProps('pet.specie')}
              />
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
              />
            </Stack>
          </Group>

          <Group grow align="flex-start">
            <TextInput
              label="Raza"
              placeholder="Ingrese raza"
              key={form.key('pet.breed')}
              {...form.getInputProps('pet.breed')}
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
              allowDeselect={false}
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
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      specieId: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      ageUnit: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      breed: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      location_latitude: PropTypes.number.isRequired,
      location_longitude: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      imageId: PropTypes.string.isRequired,
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
