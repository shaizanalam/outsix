// Zero-dependency Supabase REST & Auth client using native Fetch API
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')
);

export const SUPABASE_CONFIG = {
  url: supabaseUrl.replace(/\/$/, ''),
  anonKey: supabaseAnonKey,
};

export async function supabaseFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  if (!isSupabaseConfigured) {
    return { data: null, error: 'Supabase not configured' };
  }

  const url = `${SUPABASE_CONFIG.url}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    apikey: SUPABASE_CONFIG.anonKey,
    Authorization: `Bearer ${SUPABASE_CONFIG.anonKey}`,
    ...((options.headers as Record<string, string>) || {}),
  };

  try {
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      const errText = await res.text();
      return { data: null, error: errText };
    }
    const data = (await res.json().catch(() => null)) as T;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : String(err) };
  }
}
