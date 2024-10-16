/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Stack, SimpleGrid, Title } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import UserPetCard from '../components/UserPet/UserPetCard';
import PanelLayout from '../components/PanelLayout';

function UserLostPetsPage() {
  const [petsData, setPetsData] = useState([]);

  const getUserPetsData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/pets');
      const data = await response.json();
      setPetsData(data);
    } catch (error) {
      console.error('Error al obtener las mascotas:', error);
    }
  };

  useEffect(() => {
    getUserPetsData();
  }, []);

  const pets = petsData.map((pet) => (
    <UserPetCard key={pet.id} data={pet} isLost={pet.type === 'lost'} />
  ));

  return (
    <AppLayout bgColor="#f8f9fa" maw={1280}>
      <PanelLayout>
        <Stack>
          <Title order={3} fw={500}>
            Mis Mascotas Perdidas
          </Title>
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
      </PanelLayout>
    </AppLayout>
  );
}

export default UserLostPetsPage;
