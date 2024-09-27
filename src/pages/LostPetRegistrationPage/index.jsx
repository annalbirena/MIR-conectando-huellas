import { Input,
  Select,
  NumberInput,
  Textarea,
  Text,
  Image,
  Button,
  Stack,
  Group } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import AppLayout from '../../components/AppLayout';
import TitlePage from '../../components/TitlePage';
import classes from './LostPetRegistrationPage.module.css';

function LostPetRegistrationPage() {
  return (
    <AppLayout>
      <Stack>
        <TitlePage
          text="Registro de"
          image="src/assets/images/lost-pet-text.svg"
          imagePosition="right"
        />
        <Stack
          className={classes.container}
          h={670}
          align="stretch"
          justify="flex-start"
          gap="lg"
        >
          <Group justify="center" grow>
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
          <Group justify="center" grow>
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
          <Group justify="center" grow>
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
              classNames={{
                wrapper: classes.inputWrapper,
              }}
              label="Descripción adicional"
              withAsterisk
              placeholder="Ingrese descripción"
            />
            <Stack align="stretch" justify="flex-start" gap="lg">
              <Text fw={500}>Ubicación de lugar de perdida</Text>
              <Image
                radius="md"
                h={100}
                w="auto"
                fit="contain"
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
              />
            </Stack>
          </Group>
        </Stack>
        <Group justify="flex-end" align="flex-end">
          <Button m="auto">Guardar datos</Button>
        </Group>
      </Stack>
    </AppLayout>
  );
}

export default LostPetRegistrationPage;
