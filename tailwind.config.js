const plugin = require('tailwindcss/plugin')

function makeColorFunction(name) {
    return ({ opacityVariable, opacityValue }) => {
        if (opacityValue !== undefined) {
            return `rgba(var(${name}), ${opacityValue})`
        }
        if (opacityVariable !== undefined) {
            return `rgba(var(${name}), var(${opacityVariable}, 1))`
        }

        return `rgb(var(${name}))`
    }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './shared-components/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: ['order-1', 'order-2', 'order-3', 'order-4', 'order-5', 'xl:order-4', 'xl:order-5'],
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant('first-child', '& > *:first-child')
        }),
    ],
    theme: {
        extend: {
            screens: {
                '3xs': '315px',
                '2xs': '345px',
                xs: '400px',
                s: '520px',
                '1.5xl': '1366px',
                '2xl': '1440px',
            },
            minHeight: { 73: '18.25rem', 32.5: '8.125rem', 35: '8.75rem' },
            spacing: {
                11: '2.75rem',
                13: '3.25rem',
                15: '3.75rem', // 60px
                17: '4.25rem',
                18: '4.5rem',
                22: '5.5rem',
                23: '5.75rem',
                25: '6.25rem',
                27: '6.75rem',
                29: '7.25rem',
                30: '7.5rem',
                35: '8.75rem',
                1.25: '0.3125rem',
                1.5: '0.375rem',
                1.75: '0.4375rem',
                2.25: '0.5625rem',
                2.75: '0.6875rem',
                3.75: '0.9375rem',
                3.5: '0.875rem',
                4.5: '1.125rem',
                5.25: '1.3125rem',
                5.5: '1.375rem', // 22px
                7.5: '1.875rem',
                9.5: '2.375rem',
                10.5: '2.625rem',
                14.5: '3.625rem',
                17.5: '4.375rem',
                19.25: '4.8125rem',
                19.5: '4.875rem',
                20.25: '5.0625rem',
                25.5: '6.375rem',
                27.5: '6.875rem',
                28.5: '7.125rem', // 114px
                31: '7.75rem',
                32.5: '8.125rem',
                37: '9.25rem',
                37.5: '9.375rem',
                38: '9.5rem', // 152px
                39: '9.75rem', // 156px
                42: '10.5rem', // 168px
                45: '11.25rem', // 180px
                45.5: '11.375rem', // 182px
                50: '12.5rem', // 200px
                51: '12.75rem', // 204px
                55: '13.75rem', // 220px
                63: '15.75rem', // 252px
                66: '16.5rem', // 264px
                70: '17.5rem', // 280px
                73: '18.25rem', // 292px
                74: '18.5rem', // 296px
                75: '18.75rem',
                78.5: '19.625rem', // 314px
                79: '19.75rem', // 316px
                85: '21.25rem', // 340px
                88.5: '22.125rem', // 354px
                90: '22.5rem', // 360px
                92: '23rem', // 368px
                100: '25rem', // 400px
                105: '26.25rem', // 420px
                110: '27.5rem', // 440px
                113.75: '28.4375rem', // 455px
                128.5: '32.125rem', // 514px
                132: '33rem', // 528px
                140: '35rem', // 560px
            },
            maxWidth: {
                container: '76.875rem',
                'profile-container': '54.375rem',
                platform: '62.5rem',
                'grid-container': '90rem',
                88.5: '22.125rem', // 354px
                106: '26.5rem', // 424px
                162: '40.5rem', // 648px
                204.5: '51.125rem', // 818px
                217: '54.25rem', // 868px
                244.5: '61.125rem', // 978px
                248: '62rem', // 992px
                274: '68.5rem', // 1096px
                maximum: '100rem',
            },
            backgroundImage: {
                auth: 'url(/img/bg-auth.jpg)',
                'game-gradient': 'linear-gradient(180deg, rgba(19, 35, 57, 0) 0%, #16263D 64.9%)',
                polygon: 'url(/img/marketplace/polygon.png)',
                form: 'linear-gradient(63.62deg, #0C598F -22.76%, #6C98B3 55.85%)',
                'nf-card': 'linear-gradient(188.53deg, #1D537C 5.27%, #113D58 114.08%)',
                'nftBg-blue': 'linear-gradient(225deg, #00FCF4 0%, #2791D2 100%)',
                'card-blur': 'linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
                'live-game-card':
                    'linear-gradient(181.19deg, rgba(3, 18, 32, 0) 1.01%, rgba(3, 18, 32, 0.720174) 55.78%, #031220 114.48%)',
                projectRoadmap: "url('/about/projectbg3.png')",
                checkProject: "url('/about/checkprojcet.png')",
                firstBlock: 'linear-gradient(180deg, #16263d 0%, #121b28 100%)',
                content: 'linear-gradient(180deg, #121b28 0%, #021e34 100%)',
                project: 'linear-gradient(180deg, #002742 0%, #16253a 100%)',
                tokenomics: 'linear-gradient(180deg, #16253a 0%, #121d2b 100%)',
                platform: '-webkit-linear-gradient(75deg, #021022 0%, #2d4b68 100%)',
                nftCard: 'radial-gradient(circle, #2569a0 0%, #0f364e 100%)',
                modal: 'linear-gradient(230deg, #739cb5 0%, #07568c 100%)',
                preloader: 'linear-gradient(45deg, #111c28 0%, #152e46 100%)',
                team: 'linear-gradient(180deg, #012643 0%, #021323 100%)',
                'about-us-main-screen-logo': 'url(/images/aboutUsPage/arena-logo.png)',
                'about-us-main-screen-blur':
                    'radial-gradient(80.37% 81.03% at 50.25% 42.92%, #008BCD 0%, rgba(0, 139, 205, 0.00) 100%)',
                'ino-perks': 'linear-gradient(225deg, #7A1DE5 0%, #272A8E 100%)',
                'referral-modal-divider':
                    'linear-gradient(90deg, rgba(255, 255, 255, 0.00) -12.76%, #FFF 50.9%, rgba(255, 255, 255, 0.00) 108.74%)',
                'join-conference': 'linear-gradient(130deg, #9F6AFE 0.05%, #462DE0 100.05%)',
                mainPageBenefitsTitle:
                    'radial-gradient(68.79% 169.79% at 22.18% -57.92%, #FFF 0%, #9E26D7 58.06%, #C11245 89.17%, #FFF 100%)',
                mainPageLeaderboardTitle:
                    'radial-gradient(126.79% 163.79% at -6.82% -36.92%, #FFF 0%, #9E26D7 38.06%, #C11245 89.17%, #FFF 100%)',
                mainPageCommunityTitle:
                    'radial-gradient(132.79% 130.79% at -2.82% -36.92%, #FFF 0%, #9E26D7 72.06%, #C11245 89.17%, #FFF 100%)',
                mainPageBlogTitle:
                    'radial-gradient(272.83% 105.52% at -86.4% 0%, #FFF 0%, #9E26D7 44.55%, #C11245 74.89%, #FFF 100%)',
                mainPagePartnersTitle:
                    'radial-gradient(88.83% 127.52% at 18.6% 0%, #FFF 0%, #9E26D7 44.55%, #C11245 74.89%, #FFF 100%)',
                'main-page-game-shadow':
                    'linear-gradient(181deg, rgba(3, 18, 32, 0.00) 1.01%, rgba(3, 18, 32, 0.72) 55.78%, #031220 114.48%)',
                'main-page-tournaments-bg': 'linear-gradient(106deg, #3D0FF1 0%, #2A0063 100%)',
            },
            borderRadius: {
                2.25: '0.5625rem',
                2.5: '0.625rem',
                3: '0.75rem',
                5: '1.25rem',
                '2xl': '1rem',
                7.5: '1.875rem',
                8: '2rem',
                modal: '3.125rem',
                45.5: '11.375rem',
            },
            fontSize: {
                0: ['0rem', 0],
                20: '1.25rem',
                28: '1.75rem',
                34: '2.125rem',
                38: ['2.375rem', '2.75rem'],
                64: ['4rem', '3.5rem'],
                80: ['5rem', '4.375rem'],
                50: ['12.5rem', '13.75rem'],
                '2xs': '0.625rem',
                'custom-xs': ['0.8125rem', '1rem'],
                'custom-sl': ['0.875rem', '1rem'],
                'custom-s': ['0.875rem', '1.25rem'],
                'custom-base': ['1rem', '1.25rem'],
                'custom-lg': ['1.125rem', '1.25rem'],
                'custom-xl': ['1.25rem', '1.5rem'],
                'custom-1xl': ['1.25rem', '1.75rem'],
                'custom-2xl': ['1.5rem', '1.75rem'],
                'custom-2.5xl': ['1.75rem', '2.25rem'],
                'custom-3xl-some': ['2rem', '2rem'],
                'custom-3xl': ['2rem', '2.5rem'],
                '3.5xl': ['2rem', '2.25rem'],
                'custom-4xl': ['2.25rem', '2.75rem'],
                'custom-5xl': ['2.5rem', '2.625rem'],
                'custom-6xl': ['2.75rem', '3.25rem'],
                'custom-7xl': ['4.75rem', '5.5rem'],
                'custom-8xl': ['5rem', '5.5rem'],
                'custom-9xl': ['8.75rem', '8.75rem'],
                mainTitle: '3.25rem',
                title: '6.25rem',
                titleMobile: '2.5rem',
                'custom-xl-about': ['1.375rem', '1.3'],
                'custom2xl-about': '1.625rem',
                '3xl-about': ['1.875rem', '1.3'],
                'custom5xl-about': '2.8125rem',
                'post-h1': ['2.375rem', '2.75rem'], // [38px, 44px]
            },
            lineHeight: { title: 0.8 },
            colors: {
                cta: makeColorFunction('--theme-cta'),
                'cta-100': makeColorFunction('--theme-cta-100'),
                'cta-600': makeColorFunction('--theme-cta-600'),
                'cta-700': makeColorFunction('--theme-cta-700'),
                success: makeColorFunction('--theme-success'),
                'success-100': makeColorFunction('--theme-success-100'),
                warning: makeColorFunction('--theme-warning'),
                error: makeColorFunction('--theme-error'),
                link: makeColorFunction('--theme-link'),
                bg: makeColorFunction('--theme-bg'),
                'base-100': makeColorFunction('--theme-base-100'),
                'base-150': makeColorFunction('--theme-base-150'),
                'base-200': makeColorFunction('--theme-base-200'),
                'base-300': makeColorFunction('--theme-base-300'),
                'base-400': makeColorFunction('--theme-base-400'),
                'base-500': makeColorFunction('--theme-base-500'),
                'base-600': makeColorFunction('--theme-base-600'),
                'base-650': makeColorFunction('--theme-base-650'),
                'base-700': makeColorFunction('--theme-base-700'),
                'base-800': makeColorFunction('--theme-base-800'),
                'rarity-legendary': makeColorFunction('--theme-rarity-legendary'),
                'rarity-rare': makeColorFunction('--theme-rarity-rare'),
                'rarity-epic': makeColorFunction('--theme-rarity-epic'),
                'rarity-common': makeColorFunction('--theme-rarity-common'),
                'rarity-uncommon': makeColorFunction('--theme-rarity-uncommon'),
                discord: makeColorFunction('--theme-discord'),
                twitter: makeColorFunction('--theme-twitter'),
                subheader: makeColorFunction('--theme-subheader'),

                'main-page-social-card': 'rgba(199, 214, 253, 0.12)',

                // old colors
                'dark-blue': '#23266F',

                'blue-bright': '#6590FF',
                'blue-light': '#02F5F2',
                'blue-electric': '#275FF3',
                'deep-blue': '#1F1C91',
                // landing colors
                bgFirst: '#16263D',
                bgSecond: '#121B28',
                bgLooking: '#132843',
                diagramCenter: '#131f30',
                platformItemBg: '#162B43',
                grayText: '#A5A5A5',
                lightGrayText: '#C6C2C2',
                tableBorder: '#424A56',
                inputBg: '#21344f4d',
                activeSelect: '#21344f',
                'preloader-border': '#337AB7',
                'preloader-border-2': '#BFE2FF',
                subtitleManePage: '#DDD9DF',
                mediaKitCard: '#C7D6FD',
            },
            boxShadow: {
                button: 'inset 0px -3px 0px #AC093C',
                'marketplace-filters': 'inset 0px -1px 0px rgba(255, 255, 255, 0.05)',
                card: '0 0 0 1px rgba(255, 83, 133, 1)',
                input: '0 0 0 1px rgba(151, 162, 180, 0.4)',
                'input-hover': '0 0 0 1px rgba(255, 255, 255, 1)',
                active: '0 0 0 2px rgba(101, 144, 255, 1)',
                'activity-button': '0 0 0 1px rgba(193, 18, 69, 1)',
            },
            dropShadow: {
                'banner-description': '0px 4px 4px rgba(var(--theme-base-100), 0.25)',
            },
            padding: { 3.5: '0.875rem', 2.5: '0.625rem' },
            gridTemplateRows: {
                'max-fr': 'max-content 1fr',
                'fr-max': '1fr max-content',
            },
            gridTemplateColumns: {
                'max-fr': 'max-content 1fr',
                'fr-max': '1fr max-content',
                'nft-card-marketplace': 'repeat(auto-fill, minmax(16.25rem, 1fr))',
                'nft-card-profile': 'repeat(auto-fill, minmax(16.75rem, 1fr))',
                'minmax-6': 'repeat(6, minmax(7rem, 1fr))',
                'marketplace-container': 'max-content minmax(17rem,1fr)',
                'game-card': 'repeat(auto-fill, minmax(21rem, 1fr))',
                'referral-table': 'minmax(6rem,1fr),minmax(8rem,1.5fr), repeat(4,minmax(6rem,1fr))',
                'series-card': 'minmax(0, 7.25rem) 1fr',
                'staking-row': '16rem repeat(5,minmax(9rem,1fr))',
                'staking-row-xl': '22rem repeat(5,minmax(9rem,1fr))',
            },
            width: { 'activities-container': 'calc(100% - 23.75rem)' },
            opacity: {
                12: '.12',
            },
        },
    },
}
