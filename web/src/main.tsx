//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {BrowserRouter} from "react-router-dom";

import './styles/reset.css';

import AppRouter from './routes';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppRouter/>
  </BrowserRouter>,
);
