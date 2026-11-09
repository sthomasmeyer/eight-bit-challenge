import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import GameOver from './components/GameOver';
import Victory from './components/Victory';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/game-over',
    element: <GameOver />
  },
  {
    path: '/victory',
    element: <Victory />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ThemeToggle />
  </React.StrictMode>
);
