import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/reset.css';

import Header from "./components/Header";
import Footer from "./components/Footer";

import LandingPage from './pages/LandingPage';
import Register from './pages/Register';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Register />
  </StrictMode>,
);
