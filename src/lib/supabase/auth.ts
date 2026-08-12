import { supabaseFetch, isSupabaseConfigured } from './client';

export type AuthUser = {
  id?: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
};

type AuthResponse = {
  id?: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
  user?: AuthUser;
  access_token?: string;
};

export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string
): Promise<{ user: AuthUser | null; error: { message: string } | null }> {
  if (!isSupabaseConfigured) {
    return {
      user: { id: `mock-${Date.now()}`, email, user_metadata: { full_name: fullName } },
      error: null,
    };
  }

  const { data, error } = await supabaseFetch<AuthResponse>('/auth/v1/signup', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      data: { full_name: fullName },
    }),
  });

  if (error || !data) {
    return { user: null, error: { message: typeof error === 'string' ? error : 'Signup failed' } };
  }

  const user: AuthUser | null =
    data.user || (data.email ? { id: data.id, email: data.email, user_metadata: data.user_metadata } : null);

  return { user, error: null };
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<{ user: AuthUser | null; error: { message: string } | null }> {
  if (!isSupabaseConfigured) {
    return {
      user: { id: `mock-${Date.now()}`, email, user_metadata: { full_name: 'OUTSIX Member' } },
      error: null,
    };
  }

  const { data, error } = await supabaseFetch<AuthResponse>('/auth/v1/token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (error || !data) {
    return { user: null, error: { message: typeof error === 'string' ? error : 'Invalid credentials' } };
  }

  if (data.access_token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('outsix_supabase_token', data.access_token);
      localStorage.setItem('outsix_user_email', data.user?.email || data.email || email);
    }
  }

  const user: AuthUser | null =
    data.user || (data.email ? { id: data.id, email: data.email, user_metadata: data.user_metadata } : null);

  return { user, error: null };
}

export async function signOutUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('outsix_supabase_token');
    localStorage.removeItem('outsix_user_email');
  }
}

export async function getCurrentUserSession(): Promise<{ user: AuthUser } | null> {
  if (typeof window !== 'undefined') {
    const email = localStorage.getItem('outsix_user_email');
    const token = localStorage.getItem('outsix_supabase_token');
    if (email && token) {
      return { user: { email, user_metadata: { full_name: email.split('@')[0] } } };
    }
  }
  return null;
}
