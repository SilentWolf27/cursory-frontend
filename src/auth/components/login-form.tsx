import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { loginSchema, type LoginFormData } from '../schemas/auth-schemas';
import clsx from 'clsx';

interface Props {
  onSuccess?: () => void;
}

// Constants moved outside component for better performance
const ERROR_CLASSES = 'text-red-600 text-sm mt-1';

const SUBMIT_BUTTON_BASE_CLASSES =
  'w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors';

const SUBMIT_BUTTON_ENABLED_CLASSES =
  'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';

const SUBMIT_BUTTON_DISABLED_CLASSES = 'bg-gray-400 cursor-not-allowed';

const getInputClasses = (hasError: boolean) =>
  clsx(
    'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
    hasError && 'border-red-500 focus:ring-red-500 focus:border-red-500'
  );

export function LoginForm({ onSuccess }: Props) {
  const { login, error: authError, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      clearError();
      await login(data);
      reset();
      onSuccess?.();
    } catch (error) {
      // Error is handled by AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* Email Field */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          autoComplete="email"
          placeholder="tu@email.com"
          className={getInputClasses(!!errors.email)}
        />
        {errors.email && (
          <p className={ERROR_CLASSES}>{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Contraseña
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className={getInputClasses(!!errors.password)}
        />
        {errors.password && (
          <p className={ERROR_CLASSES}>{errors.password.message}</p>
        )}
      </div>

      {/* Auth Error Display */}
      {authError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <p className="text-red-800 text-sm">{authError}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className={clsx(
          SUBMIT_BUTTON_BASE_CLASSES,
          isValid && !isSubmitting
            ? SUBMIT_BUTTON_ENABLED_CLASSES
            : SUBMIT_BUTTON_DISABLED_CLASSES
        )}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Iniciando sesión...
          </>
        ) : (
          'Iniciar sesión'
        )}
      </button>
    </form>
  );
}
