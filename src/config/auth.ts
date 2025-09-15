export const authConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'https://deltaaquarismo.com.br',
  tokenEndpoint: import.meta.env.DEV
    ? '/oauth/token'
    : (import.meta.env.VITE_OAUTH_TOKEN_URL ?? 'https://deltaaquarismo.com.br/oauth/token'),
  clientId: import.meta.env.VITE_OAUTH_CLIENT_ID ?? '4',
  clientSecret: import.meta.env.VITE_OAUTH_CLIENT_SECRET ?? 'EuniG5yEZwSzJz58sbluhJlW5r318nnXwhAmsNA7',
};


