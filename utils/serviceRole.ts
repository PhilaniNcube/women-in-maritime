import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.SUPABASE_SEVICE_ROLE

if (!url || !anonKey) {
    throw new Error('Missing parameters for supabase client')
}

const serviceRole = createClient(
    url, anonKey,
);

export default serviceRole
