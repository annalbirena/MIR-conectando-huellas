import React from 'react';
import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';
import PetCard from '../components/PetCard';
import { SimpleGrid, Button } from '@mantine/core';
import petData from '../data/petData';
function AdoptionPage() {
  const items = petData.map((pet) => (
    <PetCard key={pet.id} data={pet} variant="adoption" />
  ));
  return (
    <AppLayout justifyContent="center">
      <TitlePage
        text="una Mascota"
        image="src/assets/images/adoption-text.svg"
        imagePosition="left"
      />
      <SimpleGrid cols={3} spacing="15%" verticalSpacing={'xl'}>
        {items}
      </SimpleGrid>
      <Button variant="filled" color="purpleBrand.3" mt="xl" m="auto">
        Mostrar Más
      </Button>
    </AppLayout>
  );
}

export default AdoptionPage;
