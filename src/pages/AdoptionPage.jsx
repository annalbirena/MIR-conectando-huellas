import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';

function AdoptionPage() {
  return (
    <AppLayout>
      <TitlePage
        text="una Mascota"
        image="src/assets/images/adoption-text.svg"
        imagePosition="left"
      />
    </AppLayout>
  );
}

export default AdoptionPage;
