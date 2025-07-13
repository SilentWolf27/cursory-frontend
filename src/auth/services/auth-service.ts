import apiClient from '../../shared/utils/api-client';
import type {
  LoginCredentials,
  LoginResponse,
  SessionResponse,
  LogoutResponse,
  RefreshResponse,
} from '../types/auth';
import type { User } from '../types/user';

export const authService = {
  /**
   * Autentica un usuario con credenciales de email y contraseña
   * @param credentials - Objeto con email y password del usuario
   * @returns Promise que resuelve con los datos del usuario autenticado
   * @throws Error si las credenciales son inválidas o hay problemas de red
   */
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      credentials
    );
    return response.data.user;
  },

  /**
   * Termina la sesión del usuario actual y limpia las cookies de autenticación
   * @returns Promise que resuelve con mensaje de confirmación
   * @throws Error si el usuario no está autenticado o hay problemas de red
   */
  async logout(): Promise<string> {
    const response = await apiClient.post<LogoutResponse>('/auth/logout');
    return response.data.message;
  },

  /**
   * Obtiene los datos completos de la sesión actual
   * @returns Promise que resuelve con usuario y datos de sesión
   * @throws Error si el usuario no está autenticado o la sesión expiró
   */
  async getSession(): Promise<SessionResponse> {
    const response = await apiClient.get<SessionResponse>('/auth/session');
    return response.data;
  },

  /**
   * Renueva el token de autenticación del usuario actual
   * @returns Promise que resuelve con mensaje de confirmación
   * @throws Error si el token de refresh es inválido o expiró
   */
  async refreshToken(): Promise<RefreshResponse> {
    const response = await apiClient.post<RefreshResponse>('/auth/refresh');
    return response.data;
  },
};
