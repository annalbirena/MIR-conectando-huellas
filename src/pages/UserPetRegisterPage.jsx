import React, { useEffect, useState } from 'react';
import { Tabs } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import PanelLayout from '../components/PanelLayout';
import LostPetForm from '../components/Forms/LostPetForm';
import AdoptPetForm from '../components/Forms/AdoptPetForm';
import { getSpecies } from '../services/user';

function UserPetRegisterPage() {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      const speciesData = await getSpecies();
      const data = speciesData.reduce(
        (acc, curr) => [
          ...acc,
          {
            value: curr.id,
            label: curr.name,
          },
        ],
        [],
      );

      setSpecies(data);
    };

    fetchSpecies();
  }, []);

  return (
    <AppLayout bgColor="#f8f9fa" maw={1280}>
      <PanelLayout>
        <Tabs defaultValue="perdidos">
          <Tabs.List grow>
            <Tabs.Tab value="perdidos">MASCOTA PERDIDA</Tabs.Tab>
            <Tabs.Tab value="adopcion">MASCOTA EN ADOPCIÓN</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="perdidos" pt="xl">
            <LostPetForm species={species} />
          </Tabs.Panel>

          <Tabs.Panel value="adopcion" pt="xl">
            <AdoptPetForm species={species} />
          </Tabs.Panel>
        </Tabs>
      </PanelLayout>
    </AppLayout>
  );
}

export default UserPetRegisterPage;
