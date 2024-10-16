import React from 'react';
import '@mantine/core/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LostsPetsPage from './pages/LostPetsPage';
import AdoptPetsPage from './pages/AdoptPetsPage';
import PetRegisterPage from './pages/PetRegisterPage';
import SheltersPage from './pages/SheltersPage';
import PetDetailsPage from './pages/PetDetailsPage';
import UserLostPetsPage from './pages/UserLostPetsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDataPage from './pages/UserDataPage';
import UserAdoptPetsPage from './pages/UserAdoptPetsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/perdidos" element={<LostsPetsPage />} />
        <Route path="/perdidos/:id" element={<PetDetailsPage isLost />} />
        <Route path="/adopcion" element={<AdoptPetsPage />} />
        <Route
          path="/adopcion/:id"
          element={<PetDetailsPage isLost={false} />}
        />
        <Route path="/albergues" element={<SheltersPage />} />
        <Route path="/mi-cuenta/datos-personales" element={<UserDataPage />} />
        <Route
          path="/mi-cuenta/publicar-mascota"
          element={<PetRegisterPage />}
        />
        <Route
          path="/mi-cuenta/mascotas-perdidas"
          element={<UserLostPetsPage />}
        />
        <Route
          path="/mi-cuenta/mascotas-adopcion"
          element={<UserAdoptPetsPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
