import React, { useState, useEffect } from 'react';
import { SimpleGrid, Button, Stack, Group } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';
import PetCard from '../components/PetCard';
import Filters from '../components/Filter';
import { getAdoptPets } from '../services/pets';

function AdoptPetsPage() {
  const [adoption, setPetsData] = useState([]);

  const getPetsData = async () => {
    const data = await getAdoptPets();
    setPetsData(data);
  };

  useEffect(() => {
    getPetsData();
  }, []);

  const pets = adoption.map((pet) => (
    <Group key={pet.id} justify="center">
      <PetCard data={pet} isLost={false} />
    </Group>
  ));

  return (
    <AppLayout>
      <Stack>
        <TitlePage
          text="una Mascota"
          image="/src/assets/images/adoption-text.svg"
          imagePosition="left"
        />
        <Group align="flex-start">
          <Filters isLost={false} />

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
              Mostrar Más
            </Button>
          </Stack>
        </Group>
      </Stack>
    </AppLayout>
  );
}

export default AdoptPetsPage;