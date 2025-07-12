import type { User } from './user';
import type { LoginCredentials } from './auth';
import type { ApiError } from '../../shared/types/error';

export interface Session {
  isAuthenticated: boolean;
  lastActivity: string;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: ApiError | null;
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

export interface AuthContextType extends AuthState, AuthActions {}
