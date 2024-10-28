/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Stack, SimpleGrid, Title, Loader, Center, Alert } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import UserPetCard from '../components/UserPet/UserPetCard';
import PanelLayout from '../components/PanelLayout';
import { useUserContext } from '../context/UserContext';
import { getLostPetsByUserId } from '../services/pets';

function UserLostPetsPage() {
  const [petsData, setPetsData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const { userId, token } = useUserContext();

  const getUserPetsData = async () => {
    setIsLoading(true);
    const data = await getLostPetsByUserId(userId, token);
    setPetsData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userId) {
      getUserPetsData();
    }
  }, [userId]);

  const pets = petsData.map((pet) => (
    <UserPetCard key={pet.id} data={pet} setPetsData={setPetsData} isLost />
  ));

  return (
    <AppLayout bgColor="#f8f9fa" maw={1280}>
      <PanelLayout>
        <Stack>
          <Title order={3} fw={500}>
            Mis Mascotas Perdidas
          </Title>
          {loading ? (
            <Center h={100} w="100%">
              <Loader size={30} />
            </Center>
          ) : petsData.length ? (
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
          ) : (
            <Center w="100%">
              <Alert variant="light" color="grape">
                No tiene mascotas registradas
              </Alert>
            </Center>
          )}
        </Stack>
      </PanelLayout>
    </AppLayout>
  );
}

export default UserLostPetsPage;
