import {
  createContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { authService } from '../services/auth-service';
import type { User } from '../types/user';
import type { LoginCredentials } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  clearSession: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState);

  const setAuthenticated = (user: User) => {
    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  };

  const clearAuthentication = () => {
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const setError = (error: string) => {
    setState(prev => ({
      ...prev,
      isLoading: false,
      error,
    }));
  };

  const clearError = () => {
    setState(prev => ({
      ...prev,
      error: null,
    }));
  };

  const setLoading = (isLoading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading,
    }));
  };

  const checkAuth = async (): Promise<void> => {
    try {
      setLoading(true);
      clearError();

      const session = await authService.getSession();
      setAuthenticated(session.user);
    } catch (error) {
      clearAuthentication();
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setLoading(true);
      clearError();

      const user = await authService.login(credentials);
      setAuthenticated(user);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error al iniciar sesión';
      setError(errorMessage);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await authService.logout();
      clearAuthentication();
    } catch (error) {
      clearAuthentication();
      console.error('Error during logout:', error);
    }
  };

  const handleSessionExpired = useCallback(() => {
    clearAuthentication();
  }, []);

  useEffect(() => {
    checkAuth();

    window.addEventListener('auth:session-expired', handleSessionExpired);

    return () => {
      window.removeEventListener('auth:session-expired', handleSessionExpired);
    };
  }, [handleSessionExpired]);

  const contextValue: AuthContextValue = {
    ...state,
    login,
    logout,
    checkAuth,
    clearError,
    clearSession: clearAuthentication,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
