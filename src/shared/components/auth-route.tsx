import { Navigate, useLocation, Outlet } from 'react-router';
import { useAuth } from '../../auth/hooks/use-auth';
import { LoadingSpinner } from './loading-spinner';

const DEFAULT_AUTHENTICATED_ROUTE = '/';

/**
 * Component for authentication routes (login, register, etc.)
 * Redirects to main page if user is already authenticated
 * Uses optimistic UI - shows content immediately if user data exists
 */
export function AuthRoute() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Optimistic UI: If we have user data, redirect immediately
  // Even if still loading (verification happens in background)
  if (isAuthenticated || (user && !isLoading)) {
    const from = location.state?.from || DEFAULT_AUTHENTICATED_ROUTE;
    return <Navigate to={from} replace />;
  }

  // Only show loading if we have no user data at all
  if (isLoading && !user) return <LoadingSpinner />;

  // Show auth content (login form, etc.)
  return <Outlet />;
}
