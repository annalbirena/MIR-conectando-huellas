import AppLayout from '../components/AppLayout';
import PetCard from '../components/PetCard';
import TitlePage from '../components/TitlePage';

const petData = {
  image:
    'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  name: 'Abril',
  age: '5',
  sex: 'Hembra',
  size: 'Mediano',
  lostDate: '29/25/24',
};

function LostsPetsPage() {
  return (
    <AppLayout>
      <TitlePage
        text="Mascotas"
        image="src/assets/images/lost-text.svg"
        imagePosition="right"
      />
      <PetCard data={petData} variant="lost" />
    </AppLayout>
  );
}

export default LostsPetsPage;
