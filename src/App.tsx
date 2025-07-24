import { Routes, Route } from 'react-router';
import { AuthRoute } from './shared/components/auth-route';
import { ProtectedRoute } from './shared/components/protected-route';
import { AppLayout } from './shared/components/app-layout';
import { lazy } from 'react';
import { AuthProvider } from './auth/hooks/auth-context';

// Lazy load pages
const LoginPage = lazy(() => import('./auth/pages/login-page'));
const CoursesPage = lazy(() => import('./courses/pages/courses-page'));
const CreateCoursePage = lazy(
  () => import('./courses/pages/create-course-page')
);

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth routes - only for unauthenticated users */}
        <Route path="/auth" element={<AuthRoute />}>
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* Public routes - accessible to everyone */}
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/terms" element={<div>Terms</div>} />

        {/* Protected routes - require authentication (including catch-all) */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route
              index
              element={<div>Home Page - Solo usuarios autenticados</div>}
            />
            <Route path="dashboard" element={<div>Dashboard</div>} />
            <Route path="cursos" element={<CoursesPage />} />
            <Route path="cursos/crear" element={<CreateCoursePage />} />
            <Route path="profile" element={<div>Profile</div>} />
            <Route path="*" element={<div>404 - Página no encontrada</div>} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
