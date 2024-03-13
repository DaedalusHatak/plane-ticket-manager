/** @type {import('next').NextConfig} */
const nextConfig = {
env:{
    // LINK:process.env.NEXT_LINK,
    // API:process.env.NEXT_API,
    // DB:process.env.NEXT_DB,
    SQL_URL:process.env.POSTGRES_URL,
    SQL_PRISMA_URL:process.env.POSTGRES_PRISMA_URL,
    SQL_URL_NON_POOLING:process.env.POSTGRES_URL_NON_POOLING,
    SQL_USER:process.env.POSTGRES_USER,
    SQL_HOST:process.env.POSTGRES_HOST,
    SQL_PASSWORD:process.env.POSTGRES_PASSWORD,
    SQL_DATABASE:process.env.POSTGRES_DATABASE,
}
}

module.exports = nextConfig
