import type { User } from './user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export interface SessionResponse {
  user: User;
  session: {
    isAuthenticated: boolean;
    lastActivity: string;
  };
}

export interface LogoutResponse {
  message: string;
}

export interface RefreshResponse {
  message: string;
}
