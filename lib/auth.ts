'use client';

const TOKEN_KEY = 'mirasoles_token';
const USER_EMAIL_KEY = 'mirasoles_user_email';

export const auth = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  
  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  },
  
  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
  },
  
  getUserEmail: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(USER_EMAIL_KEY);
  },
  
  setUserEmail: (email: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_EMAIL_KEY, email);
  },
  
  isAuthenticated: (): boolean => {
    return !!auth.getToken();
  },
};

export default auth;
