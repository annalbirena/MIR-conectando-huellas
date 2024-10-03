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

function AdoptPetDetail() {
  return (
    <Stack>
      <Group grow justify="space-between">
        <Image
          src="https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            Kiara
          </Title>
          <Stack gap="xs">
            <Group grow>
              <Field label="Edad" value="4 años" />
              <Field label="Especie" value="Perro" />
            </Group>
            <Group grow>
              <Field label="Sexo" value="Macho" />
              <Field label="Raza" value="Labrador" />
            </Group>
            <Group grow>
              <Field label="Tamaño" value="Mediano" />
              <Field label="Estado" value="En adopción" />
            </Group>
          </Stack>

          <Stack gap="xs">
            <Text fw="600">Contacto</Text>
            <Field label="Nombre" value="Jane Mayta" />
            <Field label="Celular" value="999165999" />
            <Field label="Dirección" value="Av. 7 de Abril Nº2020 Lima" />
          </Stack>
        </Stack>
      </Group>
      <Field label="Descripción adicional" value="-" />
      <Text size="sm" c="dimmed">
        Ubicación de mascota
      </Text>
      <PetMapCard />
    </Stack>
  );
}

export default AdoptPetDetail;
