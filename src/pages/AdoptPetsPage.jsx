/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import {
  SimpleGrid,
  Button,
  Stack,
  Group,
  Center,
  Loader,
  Box,
  LoadingOverlay,
} from '@mantine/core';
import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';
import PetCard from '../components/PetCard';
import Filters from '../components/Filter';
import { getAdoptPets } from '../services/pets';

function AdoptPetsPage() {
  const [petsData, setPetsData] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [loadingFilterPets, setLoadingFilterPets] = useState(false);

  const getPetsData = async () => {
    setLoadingPets(true);
    const data = await getAdoptPets();
    setPetsData(data);
    setLoadingPets(false);
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
    <AppLayout>
      <Stack>
        <TitlePage
          text="una Mascota"
          image="/src/assets/images/adoption-text.svg"
          imagePosition="left"
        />
        <Group align="flex-start">
          <Filters
            setPetsData={setPetsData}
            loadingFilterPets={loadingFilterPets}
            setLoadingFilterPets={setLoadingFilterPets}
            isLost={false}
          />

          <Stack flex={1}>
            {loadingPets ? (
              <Center h={100} w="100%">
                <Loader color="brand" />
              </Center>
            ) : (
              <Box pos="relative">
                <LoadingOverlay
                  visible={loadingFilterPets}
                  zIndex={1000}
                  overlayProps={{ radius: 'sm', blur: 0.5 }}
                />
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
              </Box>
            )}

            <Button variant="filled" color="purpleBrand.3" mt="xl" m="auto">
              Mostrar más
            </Button>
          </Stack>
        </Group>
      </Stack>
    </AppLayout>
  );
}

export default AdoptPetsPage;
