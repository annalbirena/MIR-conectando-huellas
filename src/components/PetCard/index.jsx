/* eslint-disable object-curly-newline */
import React from 'react';
import { Button, Card, Group, Image, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './petcard.module.css';
import {
  formatLostDate,
  getAgeName,
  getSexName,
  getSizeName,
} from '../../utils/formatData';

function PetCard({ data, isLost }) {
  return (
    <Card w="100%" maw={310} className={classes.card}>
      <Card.Section>
        <Image src={data.pet.imageUrl} alt={data.pet.name} height={250} />
      </Card.Section>
      <Card.Section p="sm">
        <Stack gap="xs">
          <Title order={3} c="dark.9">
            {data.pet.name}
          </Title>
          {isLost ? (
            <Stack gap={0}>
              <Text c="red.7" size="sm" fw={500}>
                Fecha de perdida:
              </Text>
              <Text c="red.7" size="sm">
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
      </Card.Section>
      <Link to={`/${isLost ? 'perdidos' : 'adopcion'}/${data.id}`}>
        <Button w="100%" variant="filled" color="dark">
          Más información
        </Button>
      </Link>
    </Card>
  );
}

PetCard.propTypes = {
  data: PropTypes.shape({
    lostDate: PropTypes.string,
    pet: PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      ageUnit: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      imageId: PropTypes.string.isRequired,
    }),
    userId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  isLost: PropTypes.bool.isRequired,
};

export default PetCard;
