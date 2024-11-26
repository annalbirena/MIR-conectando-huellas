/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
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
  Alert,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import AppLayout from '../components/AppLayout';
import PetCard from '../components/PetCard';
import TitlePage from '../components/TitlePage';
import Filters from '../components/Filter';
import { getLostPets } from '../services/pets';
import classes from './pages.module.css';

function LostsPetsPage() {
  const [petsData, setPetsData] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [loadingFilterPets, setLoadingFilterPets] = useState(false);
  const [loadingClearFilterPets, setLoadingClearFilterPets] = useState(false);

  const getPetsData = async () => {
    setLoadingPets(true);

    try {
      const data = await getLostPets();
      setPetsData(data);
    } catch (error) {
      console.log(error);
      notifications.show({
        title: 'Error!',
        message: 'No se pudo obtener las mascotas.',
        icon: <IconX size={20} />,
      });
    } finally {
      setLoadingPets(false);
    }
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
          image="/lost-text.svg"
          imagePosition="right"
        />

        <Group align="flex-start" className={classes.petsContainer}>
          <Filters
            setPetsData={setPetsData}
            loadingFilterPets={loadingFilterPets}
            setLoadingFilterPets={setLoadingFilterPets}
            loadingClearFilterPets={loadingClearFilterPets}
            setLoadingClearFilterPets={setLoadingClearFilterPets}
            isLost
          />

          <Stack flex={1}>
            {loadingPets ? (
              <Center h={100} w="100%">
                <Loader color="brand" />
              </Center>
            ) : petsData.length ? (
              <Box pos="relative">
                <LoadingOverlay
                  visible={loadingClearFilterPets || loadingFilterPets}
                  zIndex={1000}
                  overlayProps={{ radius: 'sm', blur: 0.5 }}
                />
                <SimpleGrid
                  cols={{
                    base: 1,
                    sm: 1,
                    md: 2,
                  }}
                  spacing="xs"
                  verticalSpacing="xl"
                >
                  {pets}
                </SimpleGrid>
              </Box>
            ) : (
              <Center w="100%">
                <Alert variant="light" color="grape">
                  No existen mascotas
                </Alert>
              </Center>
            )}
          </Stack>
        </Group>
      </Stack>
    </AppLayout>
  );
}

export default LostsPetsPage;
