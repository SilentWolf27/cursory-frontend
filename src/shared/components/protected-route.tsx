import { Navigate, useLocation, Outlet } from 'react-router';
import { useAuth } from '../../auth/hooks/use-auth';
import { LoadingSpinner } from './loading-spinner';

const DEFAULT_UNAUTHENTICATED_ROUTE = '/auth/login';

/**
 * Component that protects routes requiring authentication
 * Redirects to login if user is not authenticated
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    return (
      <Navigate
        to={DEFAULT_UNAUTHENTICATED_ROUTE}
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
}
