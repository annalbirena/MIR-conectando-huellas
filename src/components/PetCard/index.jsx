import React from 'react';
import { Button, Card, Image, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './petcard.module.css';

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
            Edad: {data.pet.age.number} {data.pet.age.type}
          </Text>
          <Text c="dark.7" size="sm">
            Sexo: {data.pet.sex}
          </Text>
          <Text c="dark.7" size="sm">
            Tamaño: {data.pet.size}
          </Text>
          {isLost ? (
            <Text c="dark.7" size="sm">
              Fecha de perdida: {data.pet.lostDate.slice(0, 10)}
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
    pet: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      age: PropTypes.shape({
        number: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }),
      sex: PropTypes.string.isRequired,
      breed: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      lostDate: PropTypes.string,
      lostLocation: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      }),
      state: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    contact: PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }),
    userId: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  isLost: PropTypes.bool.isRequired,
};

export default PetCard;
