import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Course } from '@/types';
import { MOCK_COURSES } from '@/lib/mock-data';

export async function createClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Ignore when called from Server Component
        }
      },
    },
  });
}

export async function getCourses(): Promise<Course[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return MOCK_COURSES;
    }

    const supabase = await createClient();
    if (!supabase) {
      return MOCK_COURSES;
    }

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return MOCK_COURSES;
    }

    return data as Course[];
  } catch {
    return MOCK_COURSES;
  }
}
