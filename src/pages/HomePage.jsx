/* eslint-disable object-curly-newline */
import React from 'react';
import {
  Button,
  Container,
  Group,
  rem,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import PetTab from '../components/PetTab';

function HomePage() {
  return (
    <AppLayout>
      <Stack>
        <Container size="md" pb={100}>
          <Title ta="center" size={rem('48px')}>
            ¡Busca a tu amigo perdido o encuentra a tu nuevo compañero!
          </Title>
          <Title
            ta="center"
            size={rem('60px')}
            ff="Cherry Bomb One"
            fw={400}
            c="purpleBrand.3"
          >
            Conectando Huellas
          </Title>
          <Text size="xl" my="xl" ta="center">
            El amor de un animal no tiene límites. Busca a tu amigo perdido o da
            un hogar a uno que te necesita. En Conectando Huellas, la conexión
            con las mascotas es el corazón de nuestra comunidad.
          </Text>

          <Group justify="center">
            <Link to="/mi-cuenta/publicar-mascota">
              <Button variant="filled" c="dark">
                ¡Registra tu mascota!
              </Button>
            </Link>
          </Group>
        </Container>
        <PetTab />
      </Stack>
    </AppLayout>
  );
}

export default HomePage;
