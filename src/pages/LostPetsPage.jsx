import React from 'react';
import { SimpleGrid, Button, Stack, Group } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import PetCard from '../components/PetCard';
import TitlePage from '../components/TitlePage';
import petData from '../data/petData';

function LostsPetsPage() {
  const pets = petData.map((pet) => (
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
          Mostrar más
        </Button>
      </Stack>
    </AppLayout>
  );
}

export default LostsPetsPage;
