export const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error('Missing NEXT_PUBLIC_API_URL');

export type ApiError = Error & { status?: number; details?: unknown };

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const hasBody = typeof options?.body !== 'undefined';
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      ...(options?.headers || {}),
    },
  });

  if (res.status === 401) {
    const err: ApiError = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }

  if (!res.ok) {
    const text = await res.text();
    type ErrorBody = { error?: string; message?: string; details?: unknown };
    let body: ErrorBody | undefined;
    try {
      body = text ? (JSON.parse(text) as ErrorBody) : undefined;
    } catch {
      body = undefined;
    }
    const err: ApiError = new Error(body?.error ?? body?.message ?? text ?? 'Request failed');
    err.status = res.status;
    err.details = body?.details;
    throw err;
  }

  return res.json();
}
