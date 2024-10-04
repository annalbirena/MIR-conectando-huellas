import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Group, Image, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import PetMapCard from '../../PetMapCard';

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
  console.log('Lost Pet details', id);
  const [data, setData] = useState({});

  useEffect(() => {
    // const url=import.meta.env.VITE_API_URL_LOST
    fetch(`http://localhost:8080/api/lostPetData/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  console.log(data);
  return (
    <Stack>
      <Group grow justify="space-between">
        <Image src="{data.pet.image}" alt="Foto de mascota" h={550} />
        <Stack gap="xl">
          <Title
            order={1}
            ff="Cherry Bomb One"
            c="purpleBrand.4"
            fw={400}
            size={48}
          >
            {data.pet.name}
          </Title>
          <Stack gap="xs">
            <Group grow>
              <Field
                label="Edad"
                value={data.pet.age.number + ' ' + data.pet.age.type}
              />
              <Field label="Especie" value={data.pet.type} />
            </Group>
            <Group grow>
              <Field label="Sexo" value={data.pet.gender} />
              <Field label="Raza" value={data.pet.breed} />
            </Group>
            <Group grow>
              <Field label="Tamaño" value={data.pet.size} />
              <Field label="Estado" value={data.pet.state} />
            </Group>
            <Field
              label="Fecha de Perdida"
              value={data.pet.lostDate.slice(0, 10)}
            />
          </Stack>

          <Stack gap="xs">
            <Text fw="600">Contacto</Text>
            <Field label="Nombre" value={data.contact.name} />
            <Field label="Celular" value={data.contact.phone} />
            <Field label="Dirección" value={data.contact.address} />
          </Stack>
        </Stack>
      </Group>
      <Field label="Descripción adicional" value={data.pet.description} />
      <Text size="sm" c="dimmed">
        Ubicación de lugar de perdida
      </Text>
      <PetMapCard />
    </Stack>
  );
}

export default LostPetDetail;
