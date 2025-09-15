import { authConfig } from '@/config/auth';

type OAuthTokenResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number; // seconds
  refresh_token?: string;
};

export async function loginWithPassword(username: string, password: string) {
  const form = new URLSearchParams();
  form.set('grant_type', 'password');
  form.set('client_id', authConfig.clientId);
  form.set('client_secret', authConfig.clientSecret);
  form.set('username', username);
  form.set('password', password);

  const response = await fetch(authConfig.tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  });

  if (!response.ok) {
    const message = await safeReadError(response);
    throw new Error(message || `Erro de autenticação (${response.status})`);
  }

  const data = (await response.json()) as OAuthTokenResponse;
  const expiresAt = data.expires_in ? Date.now() + data.expires_in * 1000 : undefined;

  return {
    accessToken: data.access_token,
    tokenType: data.token_type,
    refreshToken: data.refresh_token,
    expiresAt,
  };
}

export async function safeReadError(res: Response): Promise<string | undefined> {
  try {
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      return json.error_description || json.message || text;
    } catch {
      return text;
    }
  } catch {
    return undefined;
  }
}


