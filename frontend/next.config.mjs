/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/photos',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;

