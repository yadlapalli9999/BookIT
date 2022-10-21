/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    DB_LOCAL_URI : 'mongodb://localhost:27017/bookit',

    STRIPE_API_KEY :'pk_test_51LvL4XSGbr99p4bo8Cr9bu83w7GaXEWsbua5dYvklfzwWNimMxHvwZBJPjLKbEEIUJsb5K4znWQreXmDDWn8oaD8001zLoEl6Z',
    STRIPE_SECRET_KEY:'sk_test_51LvL4XSGbr99p4boVRZE6vh9RwO3lIAdQKxOZvJ78xwUVZHqFg2lQOpLOIh1bSvspBEcp9SwVrXXXpAcJe6C4xLq00YtWQONk5',
    CLOUDINARY_CLOUD_NAME:'dc26muxal',
    CLOUDINARY_API_KEY:'943686368841334',
    CLOUDINARY_SECRET_KEY:'oP--Se49moFEoLovdQv_Dt-ky54',

    SMTP_HOST : 'smtp.mailtrap.io',
    SMTP_PORT:'2525',
    SMTP_USER:'421ab83e9c3316',
    SMTP_PASSWORD:'0936d84c508f32',
    SMTP_FROM_NAME:'BookIT',
    SMTP_FROM_EMAIL:'noreply@bookit.com'

  },
  images: {
    domains: ['res.cloudinary.com'],
  }
}

module.exports = nextConfig
