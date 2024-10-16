import React, { useEffect, useState } from 'react';
import { Group, Image, Stack, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PetMapCard from '../../PetMapCard';
import { getAdoptPetById } from '../../../services/pets';

function Field({ label, value }) {
  return (
    <Stack gap={0}>
      <Text size="sm" c="dimmed">
        {label}
      </Text>
      <Text fw={500}>{value}</Text>
    </Stack>
  );
}
Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

function AdoptPetDetail() {
  const { id } = useParams();
  const [petData, setPetData] = useState();

  const getPetData = async () => {
    const data = await getAdoptPetById(id);
    setPetData(data);
  };

  useEffect(() => {
    getPetData();
  }, [id]);

  return petData ? (
    <Stack>
      <Group grow justify="space-between">
        <Image
          /* src={petData.pet.image} */
          src="https://media.es.wired.com/photos/65845b5ea4076464da362974/16:9/w_2560%2Cc_limit/Science-Life-Extension-Drug-for-Big-Dogs-Is-Getting-Closer-1330545769.jpg"
          alt="Foto de mascota"
          h={550}
        />

        <Stack gap="xl">
          <Title
            order={1}
            ff="Cherry Bomb One"
            c="purpleBrand.4"
            fw={400}
            size={48}
          >
            {petData.pet.name}
          </Title>
          <Stack gap="xs">
            <Group grow>
              <Field
                label="Edad"
                value={`${petData.pet.age.number} ${petData.pet.age.type}`}
              />
              <Field label="Especie" value={petData.pet.type} />
            </Group>
            <Group grow>
              <Field label="Sexo" value={petData.pet.sex} />
              <Field label="Raza" value={petData.pet.breed} />
            </Group>
            <Group grow>
              <Field label="Tamaño" value={petData.pet.size} />
              <Field label="Estado" value={petData.pet.state} />
            </Group>
          </Stack>

          <Stack gap="xs">
            <Text fw="600">Contacto</Text>
            <Field label="Nombre" value={petData.contact.name} />
            <Field label="Celular" value={petData.contact.phone} />
            <Field label="Dirección" value={petData.contact.address} />
          </Stack>
        </Stack>
      </Group>
      <Field label="Descripción adicional" value={petData.pet.description} />
      <Text size="sm" c="dimmed">
        Ubicación de mascota
      </Text>
      <PetMapCard location={petData.pet.location} />
    </Stack>
  ) : null;
}

export default AdoptPetDetail;
