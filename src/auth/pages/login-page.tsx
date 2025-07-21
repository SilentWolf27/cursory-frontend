import { useLocation, useNavigate } from 'react-router';
import { LoginForm } from '../components/login-form';

const DEFAULT_AUTHENTICATED_ROUTE = '/';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginSuccess = () => {
    const from = location.state?.from || DEFAULT_AUTHENTICATED_ROUTE;
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome to Cursory
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Sign in to your account
          </p>
        </div>

        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}
