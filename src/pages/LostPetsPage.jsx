import React from 'react';
import AppLayout from '../components/AppLayout';
import PetCard from '../components/PetCard';
import TitlePage from '../components/TitlePage';
import { SimpleGrid, Button, Stack } from '@mantine/core';
import petData from '../data/petData';

function LostsPetsPage() {
  return (
    <AppLayout>
      <Stack>
        <TitlePage
          text="Mascotas"
          image="src/assets/images/lost-text.svg"
          imagePosition="right"
        />
        <SimpleGrid cols={3} spacing="15%" verticalSpacing={'xl'}>
          {petData.map((pet) => (
            <PetCard key={pet.id} data={pet} variant="lost" />
          ))}
        </SimpleGrid>
        <Button variant="filled" color="purpleBrand.3" mt="xl" m="auto">
          Mostrar más
        </Button>
      </Stack>
    </AppLayout>
  );
}

export default LostsPetsPage;
