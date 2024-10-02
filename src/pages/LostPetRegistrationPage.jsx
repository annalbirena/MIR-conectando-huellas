import React from 'react';
import { Button,
  Checkbox,
  FileInput,
  Group,
  Input,
  rem,
  Select,
  Stack,
  Text,
  Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconPhotoScan } from '@tabler/icons-react';
import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';
import AgeInput from '../components/AgeInput';
import MapCard from '../components/MapCard';

function LostPetRegistrationPage() {
  const icon = (
    <IconPhotoScan
      style={{
        width: rem(18),
        height: rem(18),
      }}
      stroke={1.5}
    />
  );

  return (
    <AppLayout>
      <Stack>
        <TitlePage
          text="Registro de"
          image="src/assets/images/lost-pet-text.svg"
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
            <AgeInput />
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
              defaultValue="Perdido"
              data={['Encontrado', 'Perdido']}
            />
          </Group>
          <FileInput
            leftSection={icon}
            label="Cargar imagen"
            placeholder="Seleccione imagen desde su equipo"
            withAsterisk
            leftSectionPointerEvents="none"
          />
          <Checkbox label="Usar dirección de usuario registrada" />
          <Group grow>
            <Input.Wrapper label="Nombre de Contacto" withAsterisk>
              <Input placeholder="Ingrese Nombre" />
            </Input.Wrapper>
            <Input.Wrapper label="Teléfono de Contacto" withAsterisk>
              <Input placeholder="Ingrese Teléfono" />
            </Input.Wrapper>
          </Group>
          <Input.Wrapper label="Dirección de Contacto" withAsterisk>
            <Input placeholder="Ingrese Dirección" />
          </Input.Wrapper>
          <Group grow align="flex-start">
            <Stack gap={4}>
              <Text fw={500} size="sm">
                Ubicación de lugar de perdida{' '}
                <Text span c="red">
                  *
                </Text>
              </Text>
              <MapCard />
            </Stack>
            <Textarea
              label="Descripción adicional"
              placeholder="Ingrese descripción"
            />
          </Group>
        </Stack>
        <Group mt="xl" justify="flex-end">
          <Button>Guardar datos</Button>
        </Group>
      </Stack>
    </AppLayout>
  );
}

export default LostPetRegistrationPage;
