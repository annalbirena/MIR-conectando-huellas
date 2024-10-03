import React from 'react';
import { SimpleGrid, Button, Stack, Group } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';
import PetCard from '../components/PetCard';
import petData from '../data/petData';

function AdoptionPage() {
  const pets = petData.map((pet) => (
    <Group key={pet.id} justify="center">
      <PetCard data={pet} isLost={false} />
    </Group>
  ));

  return (
    <AppLayout justifyContent="center">
      <Stack>
        <TitlePage
          text="una Mascota"
          image="/src/assets/images/adoption-text.svg"
          imagePosition="left"
        />
        <SimpleGrid
          cols={{
            base: 1,
            sm: 2,
            md: 3,
          }}
          spacing="xl"
          verticalSpacing="xl"
        >
          {pets}
        </SimpleGrid>
        <Button variant="filled" color="purpleBrand.3" mt="xl" m="auto">
          Mostrar Más
        </Button>
      </Stack>
    </AppLayout>
  );
}

export default AdoptionPage;
