/* eslint-disable object-curly-newline */
import React from 'react';
import { Box, Button, Group, Image, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import PetTab from '../../components/PetTab';
import classes from './home.module.css';

function HomePage() {
  return (
    <AppLayout>
      <Stack>
        <Stack align="center" pb={100}>
          <Title className={classes.title} ta="center">
            ¡Busca a tu amigo perdido o encuentra a tu nuevo compañero!
          </Title>
          <Box>
            <Image h={{ base: 250, sm: 350 }} w="auto" src="/pet-and-dog.png" />
          </Box>
          <Text size="xl" my="xl" ta="center">
            El amor de un animal no tiene límites. Busca a tu amigo perdido o da
            un hogar a uno que te necesita. En{' '}
            <Text span c="purpleBrand.3" fw={500} inherit>
              Conectando huellas
            </Text>
            , la conexión con las mascotas es el corazón de nuestra comunidad.
          </Text>

          <Group justify="center">
            <Link to="/mi-cuenta/publicar-mascota">
              <Button variant="filled" c="dark">
                ¡Registra tu mascota!
              </Button>
            </Link>
          </Group>
        </Stack>

        <PetTab />
      </Stack>
    </AppLayout>
  );
}

export default HomePage;
