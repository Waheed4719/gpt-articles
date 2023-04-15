/** @type {import('next').NextConfig} */
import dotenv from 'dotenv'
dotenv.config()
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}

export default nextConfig
