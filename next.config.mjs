/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        remotePatterns:[{hostname:"images.unsplash.com"}]
    }
};

export default nextConfig;
