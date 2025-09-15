import { loginWithPassword } from '@/services/authApi';
import { clearToken, isTokenValid, loadToken, saveToken, StoredToken } from '@/utils/storage';

const tokenState = ref<StoredToken | null>(loadToken());
const loadingState = ref(false);
const errorState = ref<string | null>(null);

export function useAuth() {
  const isAuthenticated = computed(() => isTokenValid(tokenState.value));

  async function login(username: string, password: string) {
    loadingState.value = true;
    errorState.value = null;
    try {
      const token = await loginWithPassword(username, password);
      tokenState.value = token;
      saveToken(token);
      return token;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao autenticar';
      errorState.value = message;
      throw err;
    } finally {
      loadingState.value = false;
    }
  }

  function logout() {
    tokenState.value = null;
    clearToken();
  }

  function getAuthHeader(): Record<string, string> {
    const t = tokenState.value;
    if (!isTokenValid(t)) return {};
    const prefix = t?.tokenType ?? 'Bearer';
    return { Authorization: `${prefix} ${t?.accessToken}` };
  }

  return {
    token: tokenState,
    isAuthenticated,
    isLoading: loadingState,
    error: errorState,
    login,
    logout,
    getAuthHeader,
  };
}


