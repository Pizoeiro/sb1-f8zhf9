import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';
import LoginScreen from './components/LoginScreen';
import HomePage from './components/HomePage';
import SerpentarioLiterario from './games/SerpentarioLiterario/SerpentarioLiterario';
import TicTacQuiz from './games/TicTacQuiz/TicTacQuiz';
import NatureBalance from './games/NatureBalance/NatureBalance';
import { useAuthStore } from './store/authStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/serpentario"
          element={
            <PrivateRoute>
              <SerpentarioLiterario />
            </PrivateRoute>
          }
        />
        <Route
          path="/tictacquiz"
          element={
            <PrivateRoute>
              <TicTacQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/naturebalance"
          element={
            <PrivateRoute>
              <NatureBalance />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}