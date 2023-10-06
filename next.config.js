/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // Use a regular expression to match API routes
                source: "/api/(.*)",
                headers: [
                    // Allow for specific domains to have access or * for all
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*",
                    },
                ],
            },
        ];
    },
    env: {
        DB_LOCAL_URI: "mongodb://0.0.0.0:27017/tee",
        DB_URI: "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.kcdmkz2.mongodb.net/amp_wave?retryWrites=true&w=majority",
        API_URL: "https://amp-wave-shahadat-hossain-akash.vercel.app/",
        NEXTAUTH_SECRET: "heisenoncode",
        CLOUD_NAME: "ds4mcgect",
        CLOUDINARY_API_KEY: "986494613662428",
        CLOUDINARY_API_SECRET: "pCg_-as5Gs7ZReNYKabkc7Xs3Nw",
        STRIPE_PUBLIC_KEY: "pk_test_51NdFHdSH9bGPvgDqU3LQjRNSS1go4IgPEvL2cg4Ybb0O4FbkoWD6b2riqsN7wpBtxheyQXtkOhTabwXMEfgFic2900owcefEyg",
        STRIPE_SECRET_KEY: "sk_test_51NdFHdSH9bGPvgDqfFfwXRaaB02drgRFQhiHovPEODK4UyeyQ2XDOgopgyP5RrOdozUA9SZHC2uSlpru7Gavszvr0036LfzGEB",
        STRIPE_WEBHOOK_SECRET: "whsec_31c3772ec2aa097d340d8a68b7bcd1115b8d64ee813286760acedcaeb643d5c2",
        NEXTAUTH_URL: "https://amp-wave-shahadat-hossain-akash.vercel.app/",
    },
    images: {
        domains: ["res.cloudinary.com"]
    },
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"]

    },
    webVitalsAttribution: ['CLS', 'LCP'],

}

module.exports = nextConfig
