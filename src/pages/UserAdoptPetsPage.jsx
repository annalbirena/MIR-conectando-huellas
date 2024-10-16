import React, { useEffect, useState } from 'react';
import { Stack, SimpleGrid, Title, Text } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import UserPetCard from '../components/UserPet/UserPetCard';
import PanelLayout from '../components/PanelLayout';
import { useUserContext } from '../context/UserContext';
import { getAdoptPetsByUserId } from '../services/pets';

function UserAdoptPetsPage() {
  const [petsData, setPetsData] = useState([]);
  const { userId } = useUserContext();

  const getUserPetsData = async () => {
    const data = await getAdoptPetsByUserId(userId);
    setPetsData(data);
  };

  useEffect(() => {
    getUserPetsData();
  }, []);

  const pets = petsData.map((pet) => (
    <UserPetCard key={pet.id} data={pet} isLost={false} />
  ));

  return (
    <AppLayout bgColor="#f8f9fa" maw={1280}>
      <PanelLayout>
        <Stack>
          <Title order={3} fw={500}>
            Mis Mascotas en Adopción
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
          </SimpleGrid>
        </Stack>
      </PanelLayout>
    </AppLayout>
  );
}

export default UserAdoptPetsPage;
