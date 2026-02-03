import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/layouts';
import { AuthGuard, GuestGuard } from '@/guard';
import NotFound from '@/pages/errors/NotFound';
import routes from './allRoutes';

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/expense-tracker"
        element={<Navigate to="/expense-tracker/dashboard/home" />}
        index={true}
      />

      {/*************************************Auth Routes********************************************/}
      <Route
        path="/expense-tracker/auth"
        element={
          <GuestGuard>
            <AuthLayout />
          </GuestGuard>
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'auth' &&
            pages?.map(({ path, element, id }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/*************************************Main Routes********************************************/}
      <Route
        path="/expense-tracker/dashboard"
        element={
          <AuthGuard>
            <div>Auth Alyout</div>
          </AuthGuard>
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout == 'dashboard' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/***************************************404 Routes****************************************************/}
      <Route path="*" element={<NotFound />} />
      <Route path="" element={<Navigate to="/expense-tracker" replace />} />
    </Routes>
  );
}
