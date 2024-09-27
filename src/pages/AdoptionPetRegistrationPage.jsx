import React from 'react';
import { Button,
  Group,
  Image,
  Input,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';

function AdoptionPetRegistrationPage() {
  return (
    <AppLayout>
      <Stack>
        <TitlePage
          text="Registro de"
          image="src/assets/images/adoption-pet-text.svg"
          imagePosition="right"
        />
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
            <NumberInput label="Edad" withAsterisk placeholder="Ingrese Edad" />
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
          <Select
            label="Estado"
            withAsterisk
            placeholder="Seleccione estado"
            data={['Encontrado', 'Perdido']}
          />
          <Input.Wrapper label="Contacto" withAsterisk>
            <Input placeholder="Ingrese contacto" />
          </Input.Wrapper>
          <Input.Wrapper label="Dirección de mascota" withAsterisk>
            <Input placeholder="Ingrese Dirección de mascota" />
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
          <Button m="auto">Guardar datos</Button>
        </Group>
      </Stack>
    </AppLayout>
  );
}

export default AdoptionPetRegistrationPage;
