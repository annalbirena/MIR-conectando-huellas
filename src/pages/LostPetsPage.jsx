import React, { useState, useEffect } from 'react';
import { SimpleGrid, Button, Stack, Group } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import PetCard from '../components/PetCard';
import TitlePage from '../components/TitlePage';
import Filters from '../components/Filter';
import { getLostPets } from '../services/pets';

function LostsPetsPage() {
  const [petsData, setPetsData] = useState([]);

  const getPetsData = async () => {
    const data = await getLostPets();
    setPetsData(data);
  };

  useEffect(() => {
    getPetsData();
  }, []);

  const pets = petsData.map((pet) => (
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
