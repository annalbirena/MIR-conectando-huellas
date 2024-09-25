import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';

function AdoptionPetRegistrationPage() {
  return (
    <AppLayout>
      <TitlePage
        text="Registro de"
        image="src/assets/images/adoption-pet-text.svg"
        imagePosition="right"
      />
    </AppLayout>
  );
}

export default AdoptionPetRegistrationPage;
