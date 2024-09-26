import React from 'react';
import AppLayout from '../components/AppLayout';
import TitlePage from '../components/TitlePage';
import PetCard from '../components/PetCard';
import { SimpleGrid, Button } from '@mantine/core';

function AdoptionPage() {
  const petData = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Abril',
      age: '5 años',
      sex: 'Hembra',
      size: 'Mediano',
      //lostDate: '29/25/24',
    },
    {
      id: 2,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ3xAa8BHuD2iQzKqbiAEdBnZ2r44lJK8yjA&s',
      name: 'Loki',
      age: '3 años',
      sex: 'Macho',
      size: 'Pequeño',
      //lostDate: '29/25/24',
    },
    {
      id: 3,
      image:
        'https://humanidades.com/wp-content/uploads/2017/02/perro-1-e1561678907722.jpg',
      name: 'Nena',
      age: '1 año',
      sex: 'Hembra',
      size: 'Pequeño',
      //lostDate: '29/25/24',
    },
    {
      id: 4,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqFqSGu35kbVqLXJXC-dC4TGmEvtZpFTfl2g&s',
      name: 'Roco',
      age: '2 años',
      sex: 'Macho',
      size: 'Pequeño',
      //lostDate: '29/25/24',
    },
    {
      id: 5,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Rsfl6dIGPbojoNrUPdja0WjgGk8ESACRZg&s',
      name: 'Minina',
      age: '3 meses',
      sex: 'Hembra',
      size: 'Pequeño',
      //lostDate: '29/25/24',
    },
    {
      id: 6,
      image:
        'https://static.fundacion-affinity.org/cdn/farfuture/46mZnLhAYw8xwZBGnHdtITnaZqhrx5cvHSN81eUMWzw/mtime:1528830293/sites/default/files/el-gato-necesita-tener-acceso-al-exterior.jpg',
      name: 'Pepe',
      age: '3 años',
      sex: 'Macho',
      size: 'Mediano',
      //lostDate: '29/25/24',
    },
    {
      id: 7,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIPhcIfvoHSMzZad65DFhhp7yROaSk4qmFtQ&s',
      name: 'Bandido',
      age: '3 años',
      sex: 'Macho',
      size: 'Grande',
      //lostDate: '29/25/24',
    },
    {
      id: 8,
      image:
        'https://images.ecestaticos.com/HA_1-33oiUkCUbnNRpc_4cLZwUo=/0x0:2119x1415/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F4c9%2F3e4%2F9c7%2F4c93e49c723347751169d354b6702931.jpg',
      name: 'Felix',
      age: '2 años',
      sex: 'Macho',
      size: 'Pequeño',
      //lostDate: '29/25/24',
    },
    {
      id: 9,
      image:
        'https://media.es.wired.com/photos/65845b5ea4076464da362974/16:9/w_2560%2Cc_limit/Science-Life-Extension-Drug-for-Big-Dogs-Is-Getting-Closer-1330545769.jpg',
      name: 'Bestia',
      age: '3 años',
      sex: 'Macho',
      size: 'Grande',
      //lostDate: '29/25/24',
    },
  ];
  const items = petData.map((pet) => (
    <PetCard key={pet.id} data={pet} variant="adoption" />
  ));
  return (
    <AppLayout justifyContent="center">
      <TitlePage
        text="una Mascota"
        image="src/assets/images/adoption-text.svg"
        imagePosition="left"
      />
      <SimpleGrid cols={3} spacing="15%" verticalSpacing={'xl'}>
        {items}
      </SimpleGrid>
      <Button
        variant="filled"
        color="grape"
        size="sd"
        radius="sm"
        style={{ width: '30%', margin: 'auto', marginTop: '40px' }}
      >
        Mostrar Más
      </Button>
    </AppLayout>
  );
}

export default AdoptionPage;
