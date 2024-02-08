import { Layout } from '@/pages/layout';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const Dashboard = React.lazy(() => import('@/pages/Dashboard/Dashboard'));
const Login = React.lazy(() => import('@/pages/Login/Login'));
const Persons = React.lazy(() => import('@/pages/Persons/Persons'));

export const Main = () => {
  return (
    <React.Suspense fallback={<Layout isLoading={true} />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/persons" element={<Persons />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}
