import { Navigate, useLocation, Outlet } from 'react-router';
import { useAuth } from '../../auth/hooks/use-auth';
import { LoadingSpinner } from './loading-spinner';

const DEFAULT_AUTHENTICATED_ROUTE = '/';

/**
 * Component for authentication routes (login, register, etc.)
 * Redirects to main page if user is already authenticated
 */
export function AuthRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;

  if (isAuthenticated) {
    const from = location.state?.from || DEFAULT_AUTHENTICATED_ROUTE;
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}
