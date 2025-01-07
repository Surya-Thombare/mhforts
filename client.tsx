import { useAuth } from '@clerk/nextjs';
// import { useAuth } from '@clerk/clerk-react'
import { createClient } from '@supabase/supabase-js';

export function useClerkSupabaseClient() {
  // The `useAuth()` hook is used to access the `getToken()` method
  const { getToken } = useAuth();
  // const { session } = useSession()

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        // Get the custom Supabase token from Clerk
        fetch: async (url, options = {}) => {
          const clerkToken = await getToken({
            template: 'mhforts',
          });

          // Insert the Clerk Supabase token into the headers
          const headers = new Headers(options?.headers);
          headers.set('Authorization', `Bearer ${clerkToken}`);

          // Now call the default fetch
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    }
  );
}