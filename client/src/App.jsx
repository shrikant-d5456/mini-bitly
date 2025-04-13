import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const SignUp = lazy(() => import('./components/SignUp'));
const Login = lazy(() => import('./components/Login'));
const URLShortner = lazy(() => import('./pages/UrlShortner'));
const Home = lazy(() => import('./pages/Home'));
const Navbar = lazy(() => import('./components/Navbar'));
const ProtectedRoute = lazy(() => import('./util/ProtextedRoute'));
const Dashboard = lazy(() => import('./components/dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

const App = () => {
  return (
    <>
      <Navbar />

      <Suspense fallback={<div>Loading content...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/url-page" element={<URLShortner />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
