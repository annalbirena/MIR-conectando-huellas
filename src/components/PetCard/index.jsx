/* eslint-disable object-curly-newline */
import React from 'react';
import { Button, Card, Image, Stack, Text, Title } from '@mantine/core';
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
    <Card w="100%" maw={250} className={classes.card}>
      <Card.Section>
        <Image src={data.pet.image} alt={data.pet.name} height={250} />
      </Card.Section>
      <Card.Section p="sm">
        <Stack gap="xs">
          <Title order={3} c="dark.9">
            {data.pet.name}
          </Title>

          <Text c="dark.7" size="sm">
            Edad: {data.pet.age} {getAgeName(data.pet.ageUnit)}
          </Text>
          <Text c="dark.7" size="sm">
            Sexo: {getSexName(data.pet.sex)}
          </Text>
          <Text c="dark.7" size="sm">
            Tamaño: {getSizeName(data.pet.size)}
          </Text>
          {isLost ? (
            <Text c="dark.7" size="sm">
              Fecha de perdida: {formatLostDate(data.lostDate)}
            </Text>
          ) : null}
        </Stack>
      </Card.Section>
      <Link to={`/${isLost ? 'perdidos' : 'adopcion'}/${data.id}`}>
        <Button w="100%" variant="filled" color="dark">
          Ver más
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
      image: PropTypes.string.isRequired,
    }),
    userId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  isLost: PropTypes.bool.isRequired,
};

export default PetCard;
