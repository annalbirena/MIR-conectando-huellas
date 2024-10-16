import React from 'react';
import { Tabs } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import PanelLayout from '../components/PanelLayout';
import LostPetForm from '../components/Forms/LostPetForm';
import AdoptPetForm from '../components/Forms/AdoptPetForm';

function UserPetRegisterPage() {
  return (
    <AppLayout bgColor="#f8f9fa" maw={1280}>
      <PanelLayout>
        <Tabs defaultValue="perdidos">
          <Tabs.List grow>
            <Tabs.Tab value="perdidos">MASCOTA PERDIDA</Tabs.Tab>
            <Tabs.Tab value="adopcion">MASCOTA EN ADOPCIÓN</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="perdidos" pt="xl">
            <LostPetForm />
          </Tabs.Panel>

          <Tabs.Panel value="adopcion" pt="xl">
            <AdoptPetForm />
          </Tabs.Panel>
        </Tabs>
      </PanelLayout>
    </AppLayout>
  );
}

export default UserPetRegisterPage;
