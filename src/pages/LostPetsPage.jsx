/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { SimpleGrid, Button, Stack, Group } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import PetCard from '../components/PetCard';
import TitlePage from '../components/TitlePage';
import Filters from '../components/Filter';

function LostsPetsPage() {
  const [lostPetData, setLostPetData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/lostPetData')
      .then((response) => response.json())
      .then((data) => {
        setLostPetData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const pets = lostPetData.map((pet) => (
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
