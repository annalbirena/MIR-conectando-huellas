import React from 'react';
import '@mantine/core/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LostsPetsPage from './pages/LostPetsPage';
import AdoptionPage from './pages/AdoptionPage';
import AdoptionPetRegistrationPage from './pages/AdoptionPetRegistrationPage';
import RegistrationPage from './pages/RegistrationPage';
import LostPetRegistrationPage from './pages/LostPetRegistrationPage';
import SheltersPage from './pages/SheltersPage';
import RegisteredPetsPage from './pages/RegisteredPetsPage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import PetDetailsPage from './pages/PetDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/perdidos" element={<LostsPetsPage />} />
        <Route path="/perdidos/:id" element={<PetDetailsPage isLost />} />
        <Route path="/adopcion" element={<AdoptionPage />} />
        <Route
          path="/adopcion/:id"
          element={<PetDetailsPage isLost={false} />}
        />
        <Route path="/albergues" element={<SheltersPage />} />
        <Route path="/registro" element={<RegistrationPage />} />
        <Route
          path="/registro-mascota-perdida"
          element={<LostPetRegistrationPage />}
        />
        <Route
          path="/registro-mascota-adopcion"
          element={<AdoptionPetRegistrationPage />}
        />
        <Route path="/mascotas-registradas" element={<RegisteredPetsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
