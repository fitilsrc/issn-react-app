import React from 'react';
import { SecuredRoute } from '@/components/secured-route';
import { UserRoleType } from '@/lib/types/UserRolesType';
import { Layout } from '@/pages/layout';
import { Route, Routes } from 'react-router-dom';

const Dashboard = React.lazy(() => import('@/pages/Dashboard/Dashboard'));
const Login = React.lazy(() => import('@/pages/Login/Login'));
const Persons = React.lazy(() => import('@/pages/Persons/Persons'));
const Person = React.lazy(() => import('@/pages/Person/Person'));

export const Main = () => {
  return (
    <React.Suspense fallback={<Layout isLoading={true} />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route element={<SecuredRoute allovedRoles={[UserRoleType.ISSN_ADMIN]}/>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/persons" element={<Persons />} />
            <Route path="/person/:personId" element={<Person />} />
          </Route>
        </Route>
      </Routes>
    </React.Suspense>
  );
}
