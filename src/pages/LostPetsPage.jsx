/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import {
  SimpleGrid,
  Stack,
  Group,
  Loader,
  Center,
  Box,
  LoadingOverlay,
} from '@mantine/core';
import AppLayout from '../components/AppLayout';
import PetCard from '../components/PetCard';
import TitlePage from '../components/TitlePage';
import Filters from '../components/Filter';
import { getLostPets } from '../services/pets';

function LostsPetsPage() {
  const [petsData, setPetsData] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [loadingFilterPets, setLoadingFilterPets] = useState(false);

  const getPetsData = async () => {
    setLoadingPets(true);
    const data = await getLostPets();
    setPetsData(data);
    setLoadingPets(false);
  };

  useEffect(() => {
    getPetsData();
  }, []);

  const pets = petsData.map((pet) => (
    <Group key={pet.id} justify="center">
      <PetCard data={pet} isLost />
    </Group>
  ));

  return (
    <AppLayout>
      <Stack>
        <TitlePage
          text="Mascotas"
          image="/src/assets/images/lost-text.svg"
          imagePosition="right"
        />

        <Group align="flex-start">
          <Filters
            setPetsData={setPetsData}
            loadingFilterPets={loadingFilterPets}
            setLoadingFilterPets={setLoadingFilterPets}
            isLost
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
          </Stack>
        </Group>
      </Stack>
    </AppLayout>
  );
}

export default LostsPetsPage;
