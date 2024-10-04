import React from 'react';
import { Stack, SimpleGrid, Title, Checkbox, Group } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import petData from '../data/petData';
import UserPetCard from '../components/UserPet/UserPetCard';

function UserPetsPage() {
  const pets = petData.map((pet) => (
    <UserPetCard key={pet.id} data={pet} isLost />
  ));

  return (
    <AppLayout>
      <Stack>
        <Title order={1} ta="center" fw={600} pb={48}>
          Mis mascotas
        </Title>
        <Checkbox.Group label="Filtrar por:" pb={24}>
          <Group mt="xs">
            <Checkbox value="perdido" label="Perdidos" />
            <Checkbox value="adopcion" label="En adopción" />
          </Group>
        </Checkbox.Group>
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
