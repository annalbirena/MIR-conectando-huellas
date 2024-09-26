import { Button, Card, Group, Image, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import classes from './petcard.module.css';

function PetCard({ data, variant }) {
  return (
    <Card w={300} className={classes.card}>
      <Card.Section>
        <Image src={data.image} alt={data.name} height={300} />
      </Card.Section>
      <Card.Section p="md">
        <Stack gap="xs">
          <Title order={3} c="dark.9">
            {data.name}
          </Title>

          <Group justify="space-between">
            <Text c="dark.7">Edad: {data.age}</Text>
            <Text c="dark.7">Sexo: {data.sex}</Text>
          </Group>
          {variant === 'lost' ? (
            <Text c="dark.7">Fecha de perdida: {data.lostDate}</Text>
          ) : null}
          <Text c="dark.7">Tamaño: {data.size}</Text>
        </Stack>
      </Card.Section>
      <Button mt="md" variant="filled" color="dark">
        Ver más
      </Button>
    </Card>
  );
}

PetCard.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.string.isRequired,
      sex: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      lostDate: PropTypes.string,
    }),
  ).isRequired,
  variant: PropTypes.string.isRequired, // lost / adoption
};

export default PetCard;
