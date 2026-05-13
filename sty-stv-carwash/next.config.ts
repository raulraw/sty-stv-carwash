import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',           // ← asta e important pentru Netlify static
  trailingSlash: true,        // recomandat
  images: {
    unoptimized: true         // obligatoriu când folosești output: 'export'
  },
};

export default nextConfig