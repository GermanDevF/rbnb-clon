/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_LOCAL_URI: "mongodb://localhost:27017/rbnb",
    DB_URI: "",

    NEXT_AUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET:
      "KJSADHFLKASJDHFAKLSJDFHASKLDJFHASDFMASNDBFASDFIOIASLDKFJASDF",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
