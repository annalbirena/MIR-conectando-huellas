import React from 'react';
import { Tabs } from '@mantine/core';
import classes from './pettab.module.css';
import LostPetsPanel from './LostPetsPanel';
import AdoptionPetsPanel from './AdoptionPetsPanel';

function PetTab() {
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
        <LostPetsPanel />
      </Tabs.Panel>

      <Tabs.Panel value="adopcion" pt="xl">
        <AdoptionPetsPanel />
      </Tabs.Panel>
    </Tabs>
  );
}

export default PetTab;
