import { useContext } from 'react';
import { AuthContext } from './auth-context';

/**
 * Hook personalizado para consumir el contexto de autenticación
 * @returns Objeto con estado y métodos de autenticación
 * @throws Error si se usa fuera del AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');

  return context;
}
