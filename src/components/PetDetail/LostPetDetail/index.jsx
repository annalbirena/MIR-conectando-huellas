/* eslint-disable object-curly-newline */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Center,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import PropTypes from 'prop-types';
import PetMapCard from '../../PetMapCard';
import { getLostPetById } from '../../../services/pets';
import {
  formatLostDate,
  getAgeName,
  getLostStateName,
  getSexName,
  getSizeName,
} from '../../../utils/formatData';

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

function LostPetDetail() {
  const { id } = useParams();
  const [petData, setPetData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getPetData = async () => {
    setIsLoading(true);
    const data = await getLostPetById(id);
    setPetData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      getPetData();
    }
  }, [id]);

  return isLoading ? (
    <Center h={100} w="100%">
      <Loader size={30} />
    </Center>
  ) : petData ? (
    <Stack>
      <Group grow justify="space-between">
        <Image src={petData.pet.image} alt="Foto de mascota" h={550} />
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
                value={`${petData.pet.age} ${getAgeName(petData.pet.ageUnit)}`}
              />
              {/* <Field label="Especie" value={petData.pet.specieId} /> */}
              <Field label="Especie" value="Perro" />
            </Group>
            <Group grow>
              <Field label="Sexo" value={getSexName(petData.pet.sex)} />
              <Field label="Raza" value={petData.pet.breed} />
            </Group>
            <Group grow>
              <Field label="Tamaño" value={getSizeName(petData.pet.size)} />
              <Field
                label="Estado"
                value={getLostStateName(petData.statusLost)}
              />
            </Group>
            <Field
              label="Fecha de Perdida"
              value={formatLostDate(petData.lostDate)}
            />
          </Stack>

          <Stack gap="xs">
            <Text fw="600">Contacto</Text>
            <Field label="Nombre" value={petData.contact.name} />
            <Field label="Celular" value={petData.contact.phone} />
            <Field label="Dirección" value={petData.contact.address} />
          </Stack>
        </Stack>
      </Group>
      <Field
        label="Descripción adicional"
        value={petData.pet.description ? petData.pet.description : '-'}
      />
      <Text size="sm" c="dimmed">
        Ubicación de lugar de perdida
      </Text>
      <PetMapCard
        location={{
          latitude: petData.pet.location_latitude,
          longitude: petData.pet.location_longitude,
        }}
      />
    </Stack>
  ) : null;
}

export default LostPetDetail;
