// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["naszsklep-api.vercel.app", "media.graphassets.com"],
	},
	experimental: {
		typedRoutes: true,
		serverActions: true,
	},
};

export default nextConfig;
