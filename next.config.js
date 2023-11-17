/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true
    },
env:{
    LINK:process.env.NEXT_LINK,
    API:process.env.NEXT_API,
    DB:process.env.NEXT_DB
}
}

module.exports = nextConfig
