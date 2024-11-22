import React from 'react';
import '@mantine/core/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LostsPetsPage from './pages/LostPetsPage';
import AdoptPetsPage from './pages/AdoptPetsPage';
import UserPetRegisterPage from './pages/UserPetRegisterPage';
import PetDetailsPage from './pages/PetDetailsPage';
import UserLostPetsPage from './pages/UserLostPetsPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import UserDataPage from './pages/UserDataPage';
import UserAdoptPetsPage from './pages/UserAdoptPetsPage';
import RequireAuth from './pages/Auth/RequiredAuth';
import PublicRoute from './pages/Auth/PublicRoute';
import VerifyAccountPage from './pages/Auth/VerifyAccount';
import MapPage from './pages/MapPage';

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
        <Route path="/mapa" element={<MapPage />} />
        <Route element={<RequireAuth />}>
          <Route
            path="/mi-cuenta/datos-personales"
            element={<UserDataPage />}
          />
          <Route
            path="/mi-cuenta/publicar-mascota"
            element={<UserPetRegisterPage />}
          />
          <Route
            path="/mi-cuenta/mascotas-perdidas"
            element={<UserLostPetsPage />}
          />
          <Route
            path="/mi-cuenta/mascotas-adopcion"
            element={<UserAdoptPetsPage />}
          />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrar-usuario" element={<SignupPage />} />
          <Route
            path="/verificar-usuario/:token"
            element={<VerifyAccountPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
