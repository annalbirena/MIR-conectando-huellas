import { Group } from '@mantine/core';
import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';
import CardButton from '../components/CardButton';

function RegistrationPage() {
  return (
    <AppLayout>
      <TitlePage
        text="Registro de"
        image="src/assets/images/pet-text.svg"
        imagePosition="right"
      />
      <Group grow gap={100}>
        <CardButton
          link="/registro-mascota-perdida"
          text="Registrar mascota perdida"
          image="src/assets/images/lostpet.png"
        />
        <CardButton
          link="/registro-mascota-adopcion"
          text="Registrar mascota en adopción"
          image="src/assets/images/pet.png"
        />
      </Group>
    </AppLayout>
  );
}

export default RegistrationPage;
