import { Routes, Route } from 'react-router';
import { LazyRoute } from './shared/components/lazy-route';
import { AuthRoute } from './shared/components/auth-route';
import { ProtectedRoute } from './shared/components/protected-route';
import { AppLayout } from './shared/components/app-layout';
import { lazy } from 'react';
import { AuthProvider } from './auth/hooks/auth-context';

// Lazy load pages
const LoginPage = lazy(() => import('./auth/pages/login-page'));
const CoursesPage = lazy(() => import('./courses/pages/courses-page'));

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth routes - only for unauthenticated users */}
        <Route path="/auth" element={<AuthRoute />}>
          <Route path="login" element={<LazyRoute component={LoginPage} />} />
        </Route>

        {/* Public routes - accessible to everyone */}
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/terms" element={<div>Terms</div>} />

        {/* Protected routes - require authentication (including catch-all) */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route
            index
            element={
              <AppLayout>
                <div>Home Page - Solo usuarios autenticados</div>
              </AppLayout>
            }
          />
          <Route
            path="dashboard"
            element={
              <AppLayout>
                <div>Dashboard</div>
              </AppLayout>
            }
          />
          <Route
            path="cursos"
            element={
              <AppLayout>
                <LazyRoute component={CoursesPage} />
              </AppLayout>
            }
          />
          <Route
            path="profile"
            element={
              <AppLayout>
                <div>Profile</div>
              </AppLayout>
            }
          />
          <Route
            path="*"
            element={
              <AppLayout>
                <div>404 - Página no encontrada</div>
              </AppLayout>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
