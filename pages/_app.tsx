import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  const [queryClient] = useState(() => new QueryClient({}));

   return (
    <UserProvider supabaseClient={supabaseClient}>

      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>

    </UserProvider>
  );
}

export default MyApp
