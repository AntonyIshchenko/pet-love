import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  component: ReactNode;
  redirectTo?: string;
};

function PrivateRoute({ component, redirectTo = '/login' }: Props) {
  const isLogged = false;
  return isLogged ? component : <Navigate to={redirectTo} />;
}

export default PrivateRoute;
