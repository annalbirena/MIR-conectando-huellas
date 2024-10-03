import React from 'react';
import { Button, Card, Image, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './petcard.module.css';

function PetCard({ data, isLost }) {
  return (
    <Card w="100%" maw={250} className={classes.card}>
      <Card.Section>
        <Image src={data.image} alt={data.name} height={250} />
      </Card.Section>
      <Card.Section p="sm">
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
          <Text c="dark.7" size="sm">
            Tamaño: {data.size}
          </Text>
          {isLost ? (
            <Text c="dark.7" size="sm">
              Fecha de perdida: {data.lostDate}
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
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    lostDate: PropTypes.string,
  }).isRequired,
  isLost: PropTypes.bool.isRequired, // lost / adoption
};

export default PetCard;
