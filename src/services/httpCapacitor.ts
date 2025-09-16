import { CapacitorHttp } from '@capacitor/core';
import { Capacitor } from '@capacitor/core';

export async function capacitorFetch(url: string, options: RequestInit = {}): Promise<Response> {
  // Se não estiver em plataforma nativa, usa fetch normal
  if (!Capacitor.isNativePlatform()) {
    return fetch(url, options);
  }

  try {
    // Converte headers para formato do Capacitor
    const headers: Record<string, string> = {};
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, options.headers);
      }
    }

    // Faz a requisição usando Capacitor HTTP
    const response = await CapacitorHttp.request({
      url,
      method: (options.method as any) || 'GET',
      headers,
      data: options.body,
    });

    // Cria um objeto Response compatível
    return new Response(JSON.stringify(response.data), {
      status: response.status,
      statusText: response.status === 200 ? 'OK' : 'Error',
      headers: new Headers(response.headers),
    });
  } catch (error) {
    console.error('Capacitor HTTP Error:', error);
    throw error;
  }
}
