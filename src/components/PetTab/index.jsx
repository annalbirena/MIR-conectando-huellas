import React from 'react';
import { Button, Group, SimpleGrid, Stack, Tabs } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './pettab.module.css';
import PetCard from '../PetCard';
import petData from './petData';

function PetTab() {
  const lostPets = petData.map((pet) => (
    <Group key={pet.id} justify="center">
      <PetCard data={pet} isLost />
    </Group>
  ));
  const adoptionPets = petData.map((pet) => (
    <Group key={pet.id} justify="center">
      <PetCard data={pet} isLost={false} />
    </Group>
  ));

  return (
    <Tabs defaultValue="perdidos">
      <Tabs.List grow>
        <Tabs.Tab
          value="perdidos"
          classNames={{
            tabLabel: classes.tabLabel,
            tab: classes.tab,
          }}
        >
          MASCOTAS PERDIDAS
        </Tabs.Tab>
        <Tabs.Tab
          classNames={{
            tabLabel: classes.tabLabel,
            tab: classes.tab,
          }}
          value="adopcion"
        >
          MASCOTAS EN ADOPCIÓN
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="perdidos" pt="xl">
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
            {lostPets}
          </SimpleGrid>
          <Group justify="center">
            <Link to="/perdidos">
              <Button variant="filled" color="purpleBrand.3" mt="xl" m="auto">
                Ver más
              </Button>
            </Link>
          </Group>
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="adopcion" pt="xl">
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
            {adoptionPets}
          </SimpleGrid>
          <Group justify="center">
            <Link to="/adopcion">
              <Button variant="filled" color="purpleBrand.3" mt="xl" m="auto">
                Ver más
              </Button>
            </Link>
          </Group>
        </Stack>
      </Tabs.Panel>
    </Tabs>
  );
}

export default PetTab;
