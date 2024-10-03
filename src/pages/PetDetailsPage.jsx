/* eslint-disable operator-linebreak */
import React from 'react';
import { Breadcrumbs, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import AdoptPetDetail from '../components/PetDetail/AdoptPetDetail';
import LostPetDetail from '../components/PetDetail/LostPetDetail';

function Field({ label, value }) {
  return (
    <Stack gap={0}>
      <Text size="sm" c="dimmed">
        {label}
      </Text>
      <Text fw={500}>{value}</Text>
    </Stack>
  );
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

function PetDetailsPage({ isLost }) {
  /* const { id } = useParams(); */
  /* console.log('Pet details', id); */

  return (
    <AppLayout>
      <>
        <Breadcrumbs pb="xl">
          <Link to={isLost ? '/perdidos' : '/adopcion'}>
            <Text c="purpleBrand.4" fw={500} size="lg">
              {isLost ? 'Perdidos' : 'Adopción'}
            </Text>
          </Link>
          <Text fw={500} size="lg">
            {isLost
              ? 'Detalle de mascota perdida'
              : 'Detalle de mascota en adopción'}
          </Text>
        </Breadcrumbs>
        {isLost ? <LostPetDetail /> : <AdoptPetDetail />}
      </>
    </AppLayout>
  );
}

PetDetailsPage.propTypes = {
  isLost: PropTypes.bool.isRequired,
};

export default PetDetailsPage;
