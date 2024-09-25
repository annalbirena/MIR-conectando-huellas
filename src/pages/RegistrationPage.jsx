import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';

function RegistrationPage() {
  return (
    <AppLayout>
      <TitlePage
        text="Registro de"
        image="src/assets/images/pet-text.svg"
        imagePosition="right"
      />
    </AppLayout>
  );
}

export default RegistrationPage;
