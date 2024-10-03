import React from 'react';
import { Button,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Modal,
  Input,
  NumberInput,
  Select,
  Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import PropTypes from 'prop-types';
import classes from './petregistered.module.css';

function PetRegistered({ data, variant }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Card w="100%" maw={350} className={classes.card}>
      <Card.Section className={classes.card_image}>
        <Image src={data.image} alt={data.name} height={300} />
      </Card.Section>
      <Card.Section className={classes.card_content}>
        <Stack gap="xs" justify="flex-start">
          <Title order={3} c="dark.9">
            {data.name}
          </Title>
          <Group justify="space-between">
            <Text c="dark.7" size="sm">
              Edad: {data.age}
            </Text>
            <Text c="dark.7" size="sm">
              Sexo: {data.sex}
            </Text>
          </Group>
          {variant === 'lost' ? (
            <Text c="dark.7" size="sm">
              Fecha de perdida: {data.lostDate}
            </Text>
          ) : null}
          <Text c="dark.7" size="sm">
            Tamaño: {data.size}
          </Text>
          <Modal
            opened={opened}
            onClose={close}
            title="Editar Mascota"
            centered
          >
            <Stack>
              <Group grow>
                <Input.Wrapper label="Nombre de mascota" withAsterisk>
                  <Input placeholder="Ingrese nombre de mascota" />
                </Input.Wrapper>
                <Select
                  label="Tipo"
                  withAsterisk
                  placeholder="Seleccione tipo"
                  data={['Perro', 'Gato', 'Otros']}
                />
              </Group>
              <Group grow>
                <NumberInput
                  label="Edad"
                  withAsterisk
                  placeholder="Ingrese Edad"
                />
                <Select
                  label="Sexo"
                  withAsterisk
                  placeholder="Seleccione sexo"
                  data={['Hembra', 'Macho']}
                />
                <Input.Wrapper label="Raza">
                  <Input placeholder="Ingrese raza" />
                </Input.Wrapper>
                <Select
                  label="Tamaño"
                  withAsterisk
                  placeholder="Seleccione tamaño"
                  data={['Pequeño', 'Mediano', 'Grande']}
                />
              </Group>
              <Group grow>
                <DateInput
                  label="Fecha de perdida"
                  withAsterisk
                  placeholder="Seleccione fecha"
                />
                <Select
                  label="Estado"
                  withAsterisk
                  placeholder="Seleccione estado"
                  data={['Encontrado', 'Perdido']}
                />
              </Group>
              <Input.Wrapper label="Contacto" withAsterisk>
                <Input placeholder="Ingrese contacto" />
              </Input.Wrapper>
              <Group grow>
                <Textarea
                  label="Descripción adicional"
                  placeholder="Ingrese descripción"
                />
                <Stack>
                  <Text fw={500}>Ubicación de lugar de perdida</Text>
                  <Image
                    radius="md"
                    h={100}
                    w="auto"
                    fit="contain"
                    src="src/assets/images/mapa.png"
                  />
                </Stack>
              </Group>
            </Stack>
            <Group mt="xl">
              <Button m="auto">Actualizar datos</Button>
              <Button m="auto" variant="default">
                Cancelar
              </Button>
            </Group>
          </Modal>

          <Button
            mt="xl"
            variant="default"
            onClick={open}
            className={classes.modal}
          >
            Editar
          </Button>
        </Stack>
      </Card.Section>
    </Card>
  );
}

PetRegistered.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    lostDate: PropTypes.string,
  }).isRequired,
  variant: PropTypes.string.isRequired, // lost / adoption
};

export default PetRegistered;
