/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, Image, Group, Text, Title, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import classes from './userpetcard.module.css';
import EditPetAction from '../EditPetAction/EditPetAction';

function UserPetCard({ data, setPetsData, isLost }) {
  return (
    <Card p={0} className={classes.card}>
      <Group grow gap={0}>
        <Image
          src={data.pet.image}
          alt={data.pet.name}
          height="100%"
          w="auto"
        />
        <Stack flex={1} h="100%" p="md" justify="space-between">
          <Stack gap="xs">
            <Title order={3} c="dark.9">
              {data.pet.name}
            </Title>
            <Text c="dark.7" size="sm">
              Edad: {data.pet.age} {data.pet.ageUnit}
            </Text>
            <Text c="dark.7" size="sm">
              Sexo: {data.pet.sex}
            </Text>

            {isLost ? (
              <Text c="dark.7" size="sm">
                Fecha de perdida: {data.lostDate}
              </Text>
            ) : null}
            <Text c="dark.7" size="sm">
              Tamaño: {data.pet.size}
            </Text>
          </Stack>

          <EditPetAction
            data={data}
            setPetsData={setPetsData}
            isLost={isLost}
          />
        </Stack>
      </Group>
    </Card>
  );
}

UserPetCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    lostDate: PropTypes.string,
    statusLost: PropTypes.bool,
    statusAdopt: PropTypes.bool,
    description: PropTypes.string.isRequired,
    pet: PropTypes.shape({
      name: PropTypes.string.isRequired,
      specieId: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      ageUnit: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      breed: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      location_latitude: PropTypes.number.isRequired,
      location_longitude: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
    contact: PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setPetsData: PropTypes.func.isRequired,
  isLost: PropTypes.bool.isRequired,
};

export default UserPetCard;
