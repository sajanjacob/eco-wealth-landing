import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    supabase_public_url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_public_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabase_service_role_key: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  middleware: ['metaPixelMiddleware']
};

export default nextConfig;
