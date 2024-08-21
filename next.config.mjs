import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers(){
      return [
        {
          source : '/(.*)',
          headers :[
            {
              key : 'Cache-Control',
              value : 'public, max-age=3600, must-revalidate',
            }
          ]
        }
      ]
    },
    experimental: {
        optimizePackageImports: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-brands-svg-icons', '@fortawesome/free-regular-svg-icons', '@fortawesome/fontawesome-svg-core','tailwind-merge'],
    },
  reactStrictMode: true,
  swcMinify: true,
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
