/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ['en-US', 'fr', 'nl-NL'],
        defaultLocale: 'en-US',
    },
    env: {
        POLYGON_MAINNET_DSN: 'https://rpc-mainnet.matic.quiknode.pro',
        POLYGON_TESTNET_DSN:
            'https://rpc-mumbai.maticvigil.com/v1/03c27dc854b5096504e2f894479ac8547104df60',
        SKALE_TESTNET_DSN: 'https://testnet.skalenodes.com/v1/giant-half-dual-testnet',
    },
    images: {
        domains: [
            'v1.api.arenagames.ldtc.space',
            'fs.bitflix.ldtc.space',
            'fs.arenavs.com',
            'api.arenavs.com',
            'localhost',
            'admin.arenagames.ldtc.space',
            'arena.pumpkin.live',
            'backend-arenagames.ldtc.space',
            'stage.arenagames.api.ldtc.space',
            'ipfs.io',
            'bafybeidezsdvfmwyb2ol7rbc54bcikx3hi7obfxw3ilfrebqgbueo6ywmm.ipfs.nftstorage.link',
            'adminpanel.arenavs.com',
            '27951809b.space',
        ],
        dangerouslyAllowSVG: true,
    },
    async redirects() {
        const authRedirects = ['/nft/sell/:id', '/profile'].map(source => ({
            source,
            destination: '/auth/sign-in',
            permanent: false,
            missing: [
                {
                    type: 'cookie',
                    key: 'refresh-token',
                },
            ],
        }))

        return authRedirects
    },
}

module.exports = nextConfig
