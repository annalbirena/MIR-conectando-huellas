/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, Image, Group, Text, Title, Stack } from '@mantine/core';
import PropTypes from 'prop-types';
import classes from './userpetcard.module.css';
import EditPetAction from '../EditPetAction/EditPetAction';

function UserPetCard({ data, isLost }) {
  return (
    <Card p={0} className={classes.card}>
      <Group grow gap={0}>
        <Image flex={1} src={data.image} alt={data.name} height={250} />
        <Stack flex={1} h="100%" p="md" justify="space-between">
          <Stack gap="xs">
            <Title order={3} c="dark.9">
              {data.name}
            </Title>
            <Text c="dark.7" size="sm">
              Edad: {data.age}
            </Text>
            <Text c="dark.7" size="sm">
              Sexo: {data.sex}
            </Text>

            {isLost ? (
              <Text c="dark.7" size="sm">
                Fecha de perdida: {data.lostDate}
              </Text>
            ) : null}
            <Text c="dark.7" size="sm">
              Tamaño: {data.size}
            </Text>
          </Stack>

          <EditPetAction data={data} />
        </Stack>
      </Group>
    </Card>
  );
}

UserPetCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    lostDate: PropTypes.string,
  }).isRequired,
  isLost: PropTypes.bool.isRequired,
};

export default UserPetCard;
