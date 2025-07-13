import { Routes, Route } from 'react-router';
import { LazyRoute } from './shared/components/lazy-route';
import { lazy } from 'react';

// Lazy load pages
const LoginPage = lazy(() => import('./auth/pages/login-page'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/login" element={<LazyRoute component={LoginPage} />} />
    </Routes>
  );
}

export default App;
