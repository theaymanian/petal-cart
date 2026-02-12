import { useState } from 'react';

const ADMIN_EMAIL = 'admin@flowers.com';
const ADMIN_PASSWORD = 'ahmed123';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adam-admin-auth') === 'true';
  });

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adam-admin-auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('adam-admin-auth');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}
