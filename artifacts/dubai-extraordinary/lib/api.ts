import { useAuth } from '@clerk/expo';

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL || '/api';

export function useApiClient() {
  const { getToken } = useAuth();

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const token = await getToken();
    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed (${response.status})`);
    }

    return response.json() as Promise<T>;
  }

  return { request };
}