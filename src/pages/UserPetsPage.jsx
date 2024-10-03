import React from 'react';
import { Group, Stack, SimpleGrid } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';
import petData from '../data/petData';
import PetRegistered from '../components/PetRegistered';

function UserPetsPage() {
  const pets = petData.map((pet) => (
    <Group key={pet.id} justify="center">
      <PetRegistered data={pet} variant="lost" />
    </Group>
  ));
  return (
    <AppLayout>
      <Stack>
        <TitlePage
          text="Tus Mascotas  "
          image="src/assets/images/adoption-pet-text.svg"
          imagePosition="right"
        />
        <SimpleGrid
          cols={{
            base: 1,
            sm: 2,
          }}
          spacing="xl"
          verticalSpacing="xl"
        >
          {pets}
        </SimpleGrid>
      </Stack>
    </AppLayout>
  );
}

export default UserPetsPage;
