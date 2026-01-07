import { ApiError, apiFetch } from './client';

export interface User {
  _id: string;
  name: string;
  email: string;
}

export type AuthUser = User;

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    return await apiFetch<AuthUser>('/check-auth', { cache: 'no-store' });
  } catch (err) {
    const e = err as ApiError;
    if (e.status === 401) return null;
    throw err;
  }
};

export const login = (payload: { email: string; password: string }) =>
  apiFetch<AuthUser>('/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const logout = () => apiFetch<{ message: string }>('/logout', { method: 'POST' });
