import { Button, Group, SimpleGrid, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../PetCard';
import { getAdoptPets } from '../../services/pets';

function AdoptionPetsPanel() {
  const [petsData, setPetsData] = useState([]);

  const getPetsData = async () => {
    const data = await getAdoptPets();
    setPetsData(data);
  };

  useEffect(() => {
    getPetsData();
  }, []);

  const pets = petsData.map((pet) => (
    <Group key={pet.id} justify="center">
      <PetCard data={pet} isLost={false} />
    </Group>
  ));

  return (
    <Stack>
      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
          md: 3,
        }}
        spacing="xs"
        verticalSpacing="lg"
      >
        {pets}
      </SimpleGrid>
      <Group justify="center">
        <Link to="/adopcion">
          <Button variant="filled" color="purpleBrand.3" mt="xl" m="auto">
            Ver más
          </Button>
        </Link>
      </Group>
    </Stack>
  );
}

export default AdoptionPetsPanel;
