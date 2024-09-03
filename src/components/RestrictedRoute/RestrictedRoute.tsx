import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  component: ReactNode;
  redirectTo?: string;
};

function RestrictedRoute({ component, redirectTo = '/' }: Props) {
  const isLogged = false;
  return isLogged ? <Navigate to={redirectTo} /> : component;
}

export default RestrictedRoute;
