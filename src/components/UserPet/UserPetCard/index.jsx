/* eslint-disable object-curly-newline */
import React from 'react';
import {
  Card,
  Group,
  Text,
  Title,
  Stack,
  Badge,
  BackgroundImage,
} from '@mantine/core';
import PropTypes from 'prop-types';
import classes from './userpetcard.module.css';
import EditPetAction from '../EditPetAction/EditPetAction';
import {
  formatLostDate,
  getAgeName,
  getSexName,
  getSizeName,
} from '../../../utils/formatData';

function UserPetCard({ data, setPetsData, isLost }) {
  return (
    <Card p={0} className={classes.card}>
      <Group grow gap={0} className={classes.content}>
        <BackgroundImage
          h="100%"
          w="auto"
          p="xs"
          src={data.pet.imageUrl}
          alt={data.pet.name}
        >
          {isLost ? (
            <Badge color={data.statusLost ? 'red' : 'cyan'}>
              {data.statusLost ? 'Perdido' : 'Encontrado'}
            </Badge>
          ) : (
            <Badge color={data.statusAdopt ? 'red' : 'cyan'}>
              {data.statusAdopt ? 'En Adopción' : 'Adoptado'}
            </Badge>
          )}
        </BackgroundImage>

        <Stack flex={1} h="100%" p="md" justify="space-between">
          <Stack gap="xs">
            <Title order={3} c="dark.9">
              {data.pet.name}
            </Title>
            {isLost ? (
              <Stack gap={0}>
                <Text c="dark.7" size="sm" fw={500}>
                  Fecha de perdida:
                </Text>
                <Text c="dark.7" size="sm">
                  {formatLostDate(data.lostDate)}
                </Text>
              </Stack>
            ) : null}

            <Group>
              <Stack gap={0} flex={1}>
                <Text c="dark.7" size="sm" fw={500}>
                  Edad:
                </Text>
                <Text c="dark.7" size="sm">
                  {data.pet.age} {getAgeName(data.pet.ageUnit)}
                </Text>
              </Stack>

              <Stack gap={0} flex={1}>
                <Text c="dark.7" size="sm" fw={500}>
                  Sexo:
                </Text>
                <Text c="dark.7" size="sm">
                  {getSexName(data.pet.sex)}
                </Text>
              </Stack>
            </Group>

            <Stack gap={0}>
              <Text c="dark.7" size="sm" fw={500}>
                Tamaño:
              </Text>
              <Text c="dark.7" size="sm">
                {getSizeName(data.pet.size)}
              </Text>
            </Stack>
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
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      specieId: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      ageUnit: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      breed: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      location_latitude: PropTypes.number.isRequired,
      location_longitude: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      imageId: PropTypes.string.isRequired,
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
