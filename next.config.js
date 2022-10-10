/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    DB_LOCAL_URI : 'mongodb://localhost:27017/bookit',
    CLOUDINARY_CLOUD_NAME:'dc26muxal',
    CLOUDINARY_API_KEY:'943686368841334',
    CLOUDINARY_SECRET_KEY:'oP--Se49moFEoLovdQv_Dt-ky54'
  },
  images: {
    domains: ['res.cloudinary.com'],
  }
}

module.exports = nextConfig
