import React from 'react';
import { Stack } from '@mantine/core';
import Header from '../components/AppLayout/Header';
import PetsMap from '../components/Map';

function MapPage() {
  return (
    <Stack h="100vh" gap={0}>
      <Header />
      <PetsMap />
    </Stack>
  );
}

export default MapPage;
