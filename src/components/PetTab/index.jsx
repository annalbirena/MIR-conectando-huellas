import React from 'react';
import { Tabs } from '@mantine/core';
import LostPetsPanel from './LostPetsPanel';
import AdoptionPetsPanel from './AdoptionPetsPanel';

function PetTab() {
  return (
    <Tabs defaultValue="perdidos">
      <Tabs.List grow>
        <Tabs.Tab value="perdidos">MASCOTAS PERDIDAS</Tabs.Tab>
        <Tabs.Tab value="adopcion">MASCOTAS EN ADOPCIÓN</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="perdidos" pt="xl">
        <LostPetsPanel />
      </Tabs.Panel>

      <Tabs.Panel value="adopcion" pt="xl">
        <AdoptionPetsPanel />
      </Tabs.Panel>
    </Tabs>
  );
}

export default PetTab;
