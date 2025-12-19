import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { Database } from './types'

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie setting in Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookie removal in Server Components
          }
        },
      },
    }
  )
}

// Client pour les API routes (sans cookies)
export function createApiSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Helper pour typer les opérations Supabase (évite les erreurs TypeScript)
export function typedUpdate<T extends keyof Database['public']['Tables']>(
  supabase: ReturnType<typeof createApiSupabaseClient>,
  table: T,
  data: Partial<Database['public']['Tables'][T]['Update']>
) {
  return (supabase.from(table) as any).update(data)
}

export function typedInsert<T extends keyof Database['public']['Tables']>(
  supabase: ReturnType<typeof createApiSupabaseClient>,
  table: T,
  data: Database['public']['Tables'][T]['Insert']
) {
  return (supabase.from(table) as any).insert(data)
}

