/* eslint-disable object-curly-newline */
import React from 'react';
import { useState, useEffect } from 'react';
import { SimpleGrid, Button, Stack, Group } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import PetCard from '../components/PetCard';
import TitlePage from '../components/TitlePage';
import Filters from '../components/Filter';

function LostsPetsPage() {
  const [mascotas, setMascotas] = useState([]);
  useEffect(() => {
    //const url=import.meta.env.VITE_API_URL_LOST
    fetch('http://localhost:8080/api/lostPetData')
      .then((response) => {
        return response.json();
      })
      .then((mascotas) => {
        setMascotas(mascotas);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  const pets = mascotas.map((pet) => (
    <Group key={pet.id} justify="center">
      <PetCard data={pet} isLost />
    </Group>
  ));
  return (
    <AppLayout>
      <Stack>
        <TitlePage
          text="Mascotas"
          image="/src/assets/images/lost-text.svg"
          imagePosition="right"
        />

        <Group align="flex-start">
          <Filters isLost />

          <Stack flex={1}>
            <SimpleGrid
              cols={{
                base: 1,
                sm: 2,
                md: 3,
              }}
              spacing="xs"
              verticalSpacing="lg"
            >
              {pets}
            </SimpleGrid>
            <Button variant="filled" color="purpleBrand.3" mt="xl" m="auto">
              Mostrar más
            </Button>
          </Stack>
        </Group>
      </Stack>
    </AppLayout>
  );
}

export default LostsPetsPage;
