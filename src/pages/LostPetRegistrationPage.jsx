import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';

function LostPetRegistrationPage() {
  return (
    <AppLayout>
      <TitlePage
        text="Registro de"
        image="src/assets/images/lost-pet-text.svg"
        imagePosition="right"
      />
    </AppLayout>
  );
}

export default LostPetRegistrationPage;
