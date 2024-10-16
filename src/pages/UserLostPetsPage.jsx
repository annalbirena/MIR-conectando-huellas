/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Stack, SimpleGrid, Title, Text } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import UserPetCard from '../components/UserPet/UserPetCard';
import PanelLayout from '../components/PanelLayout';
import { useUserContext } from '../context/UserContext';
import { getLostPetsByUserId } from '../services/pets';

function UserLostPetsPage() {
  const [petsData, setPetsData] = useState([]);
  const { userId } = useUserContext();

  const getUserPetsData = async () => {
    const data = await getLostPetsByUserId(userId);
    setPetsData(data);
  };

  useEffect(() => {
    getUserPetsData();
  }, []);

  const pets = petsData.map((pet) => (
    <UserPetCard key={pet.id} data={pet} isLost />
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
            {petsData.length ? (
              pets
            ) : (
              <Text>No tiene mascotas registradas</Text>
            )}
            {pets}
          </SimpleGrid>
        </Stack>
      </PanelLayout>
    </AppLayout>
  );
}

export default UserLostPetsPage;
