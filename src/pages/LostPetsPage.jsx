import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';

function LostsPetsPage() {
  return (
    <AppLayout>
      <TitlePage
        text="Mascotas"
        image="src/assets/images/lost-text.svg"
        imagePosition="right"
      />
    </AppLayout>
  );
}

export default LostsPetsPage;
