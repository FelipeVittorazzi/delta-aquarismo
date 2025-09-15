const TOKEN_KEY = 'da_auth_token';

export type StoredToken = {
  accessToken: string;
  tokenType?: string;
  expiresAt?: number; // epoch ms
  refreshToken?: string;
};

export function saveToken(token: StoredToken): void {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function loadToken(): StoredToken | null {
  const raw = localStorage.getItem(TOKEN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredToken;
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function isTokenValid(token: StoredToken | null): boolean {
  if (!token) return false;
  if (!token.expiresAt) return true;
  return Date.now() < token.expiresAt - 5_000; // margem de 5s
}


