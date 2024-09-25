import { Button, Card, Group, Image, Text, Title } from '@mantine/core';
import classes from './petcard.module.css';

const mockdata = {
  image:
    'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  name: 'Abril',
  age: '5',
  sex: 'Hembra',
  size: 'Mediano',
  lostDate: '29/25/24',
};

function PetCard() {
  const { image, name, age, sex, size, lostDate } = mockdata;

  return (
    <Card w={300} className={classes.card}>
      <Card.Section>
        <Image src={image} alt={name} height={300} />
      </Card.Section>
      <Card.Section p="md">
        <Title order={3} pb="xs" c="dark.9">
          {name}
        </Title>
        <Group justify="space-between">
          <Text c="dark.7">Edad: {age}</Text>
          <Text c="dark.7">Sexo: {sex}</Text>
        </Group>
        <Text c="dark.7">Tamaño: {size}</Text>
        <Text c="dark.7">Fecha de perdida: {lostDate}</Text>
      </Card.Section>
      <Button mt="md" variant="filled" color="dark">
        Ver más
      </Button>
    </Card>
  );
}

export default PetCard;
