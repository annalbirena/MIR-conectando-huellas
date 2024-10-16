import React from 'react';
import { Stack, Title } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import PanelLayout from '../components/PanelLayout';
import UserForm from '../components/Forms/UserForm';

function UserDataPage() {
  return (
    <AppLayout bgColor="#f8f9fa" maw={1280}>
      <PanelLayout>
        <Stack>
          <Title order={3} fw={500}>
            Datos Personales
          </Title>
          <UserForm />
        </Stack>
      </PanelLayout>
    </AppLayout>
  );
}

export default UserDataPage;
