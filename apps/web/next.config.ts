import type { NextConfig } from 'next';

// Base path for GitHub Pages project sites (e.g. "/BMZ-Trade-Lab").
// Empty for local dev and root-hosted deployments.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  typedRoutes: true,
};

export default nextConfig;
