/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['flagcdn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // Add transpilePackages to ensure proper bundling of dependencies
  transpilePackages: [
    '@radix-ui/react-alert-dialog',
    '@radix-ui/react-avatar',
    '@radix-ui/react-progress',
    '@radix-ui/react-select',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-dialog',
    '@radix-ui/react-popover',
    '@radix-ui/react-slot',
    '@radix-ui/react-toast',
    '@radix-ui/react-toggle',
    '@radix-ui/react-tooltip',
    '@radix-ui/react-label',
    '@radix-ui/react-tabs',
    'class-variance-authority',
    'clsx',
    'lucide-react',
    'tailwind-merge',
    'tailwindcss-animate',
  ],
}

export default nextConfig
