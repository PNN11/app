import { TextContentType } from 'utils/types/TextContentType'

export const mockHomePageText: TextContentType = {
    header: {
        buttons: {
            home: 'home',
            aboutUs: 'about Us',
            games: 'games',
            documentation: {
                title: 'documentation',
                subMenuItems: [
                    {
                        title: 'Whitepaper',
                        link: 'https://arena-master.gitbook.io/arena-games',
                    },
                    {
                        title: 'Pinch Deck',
                        link: '/ArenaMasterDeckFinal.pdf',
                    },
                ],
            },
            ourTeam: 'our team',
            partners: 'partners',
            login: 'Sign in',
            blog: 'Blog',
            marketplace: 'Marketplace',
            swap: 'Swap',
        },
        comingSoon: 'coming soon',
    },
    bannersSlider: [
        {
            firstButton: {
                title: 'Explore Games',
                link: '/games/6389edb2e3412b79efb7d35a',
            },
            description:
                'Arena Games is a Web3 multiplayer mobile games platform connecting game developers and players in a simple and safe mode ',
            image: '/images/bannersSlider/banner1.png',
            title: 'Play Web3 Games in the Multi-chain Ecosystem',
        },
        {
            firstButton: { title: 'Join whitelist', link: 'https://tally.so/r/mRx62j' },
            description:
                'Season rewards will come from the rewards pools, they will be game specific, and the season length/total rewards will be adjusted per game and per season.',
            image: '/images/bannersSlider/banner2.png',
            title: 'Buy Arena Games Passes',
        },
        {
            firstButton: {
                title: 'Open Game',
                link: '/games/6389edb2e3412b79efb7d35a',
            },
            description:
                'Experience whole new world of Arcane Merge — a legendary turn based puzzle game in multiplayer / matchmaking mode Explore digital art & unique characters',
            image: '/images/bannersSlider/banner3.png',
            title: 'Play Arcane Merge',
        },
    ],
    gamesBlock: {
        button: {
            title: 'See all games',
            link: '/games',
        },
        title: 'Featured Games',
        games: [
            {
                title: 'Arcane Merge',
                description: 'Based puzzle game',
                image: '/images/gamesBlock/arena-master.png',
                active: true,
                tags: ['Desktop', 'iOS', 'Android'],
                nftCount: 140,
                id: '6389edb2e3412b79efb7d35a',
            },
            {
                title: 'Tanks',
                description: 'Based puzzle game',
                image: '/images/gamesBlock/tanks.png',
                active: false,
                tags: ['Desktop', 'iOS', 'Android'],
            },
            {
                title: 'Medieval Battle',
                description: 'Based puzzle game',
                image: '/images/gamesBlock/medieval-battle.png',
                active: false,
                tags: ['Desktop', 'iOS', 'Android'],
            },
        ],
    },
    marketplaceBlock: {
        button: 'Coming soon',
        title: 'NFT Marketplace Highlights',
        description:
            'Our NFT sale is the perfect chance for you to acquire rare and valuable NFTs that not only enhance your gaming experience but also serve as digital collectibles with growing value.',
        nftCards: [
            {
                _id: '1',
                currency: { symbol: 'AGP' },
                priceAmount: 14,
                preview: '/video/marketplace/legendary.mp4',
                rarity: 'Legendary',
                payload: {
                    logo: '/images/marketplace/legendary.png',
                    game: { title: 'Arena Games' },
                    name: 'Legendary',
                },
            },
            {
                _id: '2',
                currency: { symbol: 'AGP' },
                priceAmount: 14,
                preview: '/video/marketplace/rare.mp4',
                rarity: 'Rare',
                payload: {
                    logo: '/images/marketplace/rare.png',
                    game: { title: 'Arena Games' },
                    name: 'Rare',
                },
            },
            {
                _id: '3',
                currency: { symbol: 'AGP' },
                priceAmount: 14,
                preview: '/video/marketplace/epic.mp4',
                rarity: 'Epic',
                payload: {
                    logo: '/images/marketplace/epic.png',

                    game: { title: 'Arena Games' },

                    name: 'Epic',
                },
            },
        ],
    },
    videoBlock: {
        title: 'How to play Arcane Merge?',
        video: 'https://www.youtube.com/embed/NmZUfLpnkUo?autoplay=1',
        image: '/images/videoBlock/poster.png',
    },
    discordBlock: {
        title: 'Join our awesome Discord community of Arena gamers to stay up to date ',
        image: '/images/discordBlock/iphone.png',
        button: { title: 'Open Discord', link: 'https://discord.com/invite/FxVyTPtF7f' },
    },
    newsBlock: {
        title: 'Arena News',
        twitterTitle: 'Twitter Updates',
        button: 'Read more news',
        news: [
            {
                title: 'Introducing Arena Games: The fastest way of bridging from Web2 to Web3.0 Gaming',
                description:
                    'Arena Games is a Web 3.0 multiplayer mobile games platform built on Binan...',
                image: '/images/newsBlock/news1.png',
                createdAt: 1682077196128,
                id: '',
            },
            {
                title: 'Arena Games Ambassador Program',
                description:
                    'The traditional gaming industry is too centralized for game developers to profit, and too expensive and insecure for gamers. Arena Games is a mobile gaming platform that makes it easy for game developers and players to transition from web 2.0 to web3 gaming.',
                image: '/images/newsBlock/news2.png',
                createdAt: 1682077196128,
                id: '',
            },
            {
                title: 'Battle it out in the Epic Arcane Merges Grand Final Tournament',
                description: 'Win Big: $AGP, NFTs, Cryptocurrency, and More!',
                image: '/images/newsBlock/news3.png',
                createdAt: 1682077196128,
                id: '',
            },
            {
                title: 'How to Play Arcane Merge Game',
                description:
                    'Arcane Merge is a multiplayer web3 game that aims to create a synergy between decentralized finance (Defi) and the gaming industry by introducing a skill-based mobile game that will add more fun and entertainment to the gaming industry while also adding value to virtual worlds.',
                image: '/images/newsBlock/news4.png',
                createdAt: 1682077196128,
                id: '',
            },
        ],
    },
    faq: [
        // { question: 'What is Arena Games?', answers: [] },
        // { question: 'How does it work?', answers: [] },
        {
            question: 'How to join the whitelist of  Arena Games?',
            answers: [
                {
                    title: 'How to join the whitelist of  Arena Games?',
                    description:
                        'Whitelist spots are open in various regular held community events. You can join our community for more information about whitelists.',
                },
                {
                    title: 'What is Player DID? Why Player DID?',
                    description:
                        "Player ID is designed to become the users' blockchain gaming profile. Users can create Web 3 Games Player ID on our portal. It's decentralized and connects your email and wallet on different chains, and social media. With Player ID integrated, you can login via email without importing your private keys to various devices. It provides easy access to the game assets and protects wallets from being hacked. The safety of your digital assets always comes first.",
                },
                {
                    title: 'How to join the whitelist of Arena games?',
                    description:
                        'Whitelist spots are open in various regular held community events. You can join our community for more information about whitelists.',
                },
            ],
        },
        // { question: 'What is Arena Games Token?', answers: [] },
    ],
    main: {
        name: 'arena games',
        title: 'FASTEST WAY FROM WEB 2.0 TO',
        title2: 'WEB3 GAMING',
        mainText: 'Set of blockchain tools to transform traditional games into GameFi world',
        buttons: {
            forDevelopers: 'For Developers',
            forGamers: 'For Gamers',
            becomeAmbassador: 'Become Ambassador',
        },
    },
    aboutUs: {
        name: 'about us',
        title: 'arena games',
        description:
            'Arena Games is a Web3 multiplayer mobile games platform connecting game developers and players in a simple and safe mode. Our full-stack solution provides easy access to a wide range of blockchain gaming technologies for both existing and new games on Web 2.0',
        slider: [
            {
                title: 'One coin',
                description: "One coin for all the platform's games",
                img: '/about/aboutUsSlider/na1.jpg',
            },
            {
                title: 'NFT marketplace',
                description: 'Own NFT marketplace',
                img: '/about/aboutUsSlider/na2.jpg',
            },
            {
                title: 'one-click',
                description: 'Fast and easy «one-click» log in via our website',
                img: '/about/aboutUsSlider/na3.jpg',
            },
            {
                title: 'modes integration',
                description: 'Free-to-play, play-to-win & play-to-earn modes integration',
                img: '/about/aboutUsSlider/na4.jpg',
            },
            {
                title: 'E-WALLET',
                description: 'E-wallet for easy deposits & withdraws staking & voting features',
                img: '/about/aboutUsSlider/na5.jpg',
            },
        ],
        call: {
            title: 'JOIN OUR PLATFORM',
            description: 'Become part of the next generation Web3 Gaming Ecosystem',
        },
        pros: [
            {
                title: 'Scale up Your Gaming Project',
                description:
                    'Secure access to the Arena Games tools that allow you to accelerate your journey from Web2 to Web3 gaming',
            },
            {
                title: 'For Game Developers, Made by Game Developers',
                description: 'Or apply for our scholarship program to Create new Web3 Game',
            },
        ],
        applyButton: 'Apply',
    },
    games: {
        name: 'games',
        title: 'Our games',
        games: [
            {
                title: 'Arcane Merge',
                img: '/about/gamesSlider/ng1_new.jpg',
                imgBg: 'linear-gradient(0deg, #030c26 0%, rgba(32, 38, 60, 0) 100%)',
                video: '/video/hover1.mp4',
                titleImg: '/about/gamesSlider/ngm1.jpg',
                appStoreLink: 'https://apps.apple.com/us/app/arena-master-puzzle-game/id1625081403',
                googlePlayLink:
                    'https://play.google.com/store/apps/details?id=com.Sambrela.ArenaMasterPuzzleGame&hl=en&gl=US',
            },
            {
                title: 'Medieval Battle',
                img: '/about/gamesSlider/ng2_new.jpg',
                imgBg: 'linear-gradient(0deg, #27221b 0%, rgba(27, 29, 36, 0) 100%)',
                video: '/video/hover2.mp4',
                titleImg: '/about/gamesSlider/ngm2.png',
                appStoreLink: '',
                googlePlayLink: '',
            },
        ],
        comingSoon: '/about/gamesSlider/ng3_new.jpg',
        appStoreImg: '/about/gamesSlider/app1.png',
        googlePlayImg: '/about/gamesSlider/app2.png',
    },
    nft: {
        name: 'nft',
        title: 'NFT MARKETPLACE',
        nftSlider: [
            {
                game: 'Arcane Merge',
                type: { title: 'CHARACTER', color: '#2cc9e1' },
                rarity: 'RARE',
                button: 'Buy',
                img: '/about/nftSlider/nft1.png',
                imgBg: '/about/nftSlider/nft1_bg.png',
                imgTitle: '/about/nftSlider/arenatitle.png',
            },
            {
                game: 'Arcane Merge',
                type: { title: 'CHARACTER', color: '#8cb51e' },
                rarity: 'COMMON',
                button: 'Buy',
                img: '/about/nftSlider/nft2.png',
                imgBg: '/about/nftSlider/nft2_bg.png',
                imgTitle: '/about/nftSlider/arenatitle.png',
            },
            {
                game: 'Arcane Merge',
                type: { title: 'CHARACTER', color: '#2cc9e1' },
                rarity: 'UNCOMMON',
                button: 'Buy',
                img: '/about/nftSlider/nft3.png',
                imgBg: '/about/nftSlider/nft1_bg.png',
                imgTitle: '/about/nftSlider/arenatitle.png',
            },
            {
                game: 'Arcane Merge',
                type: { title: 'CHARACTER', color: '#e3b651' },
                rarity: 'LEGENDARY',
                button: 'Buy',
                img: '/about/nftSlider/nft4.png',
                imgBg: '/about/nftSlider/nft3_bg.png',
                imgTitle: '/about/nftSlider/arenatitle.png',
            },
            {
                game: 'Arcane Merge',
                type: { title: 'CHARACTER', color: '#8cb51e' },
                rarity: 'epic',
                button: 'Buy',
                img: '/about/nftSlider/nft5.png',
                imgBg: '/about/nftSlider/nft2_bg.png',
                imgTitle: '/about/nftSlider/arenatitle.png',
            },
            {
                game: 'Arcane Merge',
                type: { title: 'CHARACTER', color: '#bf655b' },
                rarity: 'epic',
                button: 'Buy',
                img: '/about/nftSlider/nft6.png',
                imgBg: '/about/nftSlider/nft4_bg.png',
                imgTitle: '/about/nftSlider/arenatitle.png',
            },
        ],
        ambassadorProgram: {
            title: 'AMBASSADOR PROGRAM',
            looking: {
                title: 'We are looking for:',
                looking: [
                    'CONTENT CREATORS',
                    'MEETUP ORGANIZERS',
                    'MODERATORS',
                    'TRANSLATORS',
                    'INFLUENCER OPINION MAKERS',
                ],
            },
            benefits: [
                '#Rewards for your contribution',
                '#Exclusive Invitations for closed events',
                '#Distinctive profile badges',
                '#Arena Games branded items',
                '#Blockchain industry experience',
            ],
            description:
                'Apply to scale up your gaming project into web3 ecosystem using our platform',
            applyButton: 'Apply',
        },
    },
    token: {
        name: 'token',
        title: 'AGP token Utility',
        utility: [
            {
                title: 'pve battles',
                description: 'Competing in PVE battles to win leaderboard prizes',
                img: '/about/token/t1.png',
            },
            {
                title: 'pvP battles',
                description: 'Competing in PVP battles against players',
                img: '/about/token/t2.png',
            },
            {
                title: 'Staking',
                description: 'Stake Arena Games Platform Token and earn passive income',
                img: '/about/token/t3.png',
            },
            {
                title: 'nft',
                description: 'Various NFT Characters and Assets available to use in the game',
                img: '/about/token/t4.png',
            },
            {
                title: 'rewards',
                description: 'Play and get diverse in-game rewards',
                img: '/about/token/t5.png',
            },
            {
                title: 'bonuses',
                description: 'Gift Boxes, Airdrops and lots of other in-game bonuses available',
                img: '/about/token/t6.png',
            },
        ],
    },
    promoVideo: {
        name: 'PROMO VIDEO',
        title: 'TRAILER ARENA GAMES',
    },
    roadMap: {
        name: 'ROADMAP',
        title: 'PROJECT ROADMAP',
        steps: [
            {
                title: 'Q4 2021 - Q3 2022',
                order: 'order-1',
                points: [
                    { title: 'White Paper', isDone: true },
                    { title: 'Seed Round Closed', isDone: true },
                    { title: 'Free-to-Play Mode Release (Ingame)', isDone: true },
                    { title: 'Game Launch / Alfa Version', isDone: true },
                    { title: 'Quarterly Game Jams Launch', isDone: true },
                    { title: 'Private Sale Opening', isDone: true },
                    { title: 'Degamefi Conference Participation', isDone: true },
                ],
            },
            {
                title: 'Q4 2022',
                order: 'order-2',
                points: [
                    { title: 'Ambassador program launch', isDone: true },
                    { title: 'Updated UI/ UX Website Release', isDone: true },
                    { title: 'AIBC Startup Pitch Win', isDone: true },
                    { title: 'Platform MVP version development', isDone: true },
                    { title: 'Binance Pay integration', isDone: true },
                ],
            },
            {
                title: 'Q1 2023',
                order: 'order-3',
                points: [
                    { title: 'Platform Beta Testing Release', isDone: false },
                    { title: 'Beta Launch of Arcane Merge', isDone: false },
                    { title: 'P2W Mode Release', isDone: false },
                    { title: 'NFT Marketplace development', isDone: false },
                    { title: 'Public Sale Opening', isDone: false },
                    { title: 'Seasonal Game Jams', isDone: false },
                ],
            },
            {
                title: 'Q2 2023',
                order: 'order-4 xl:order-5',
                points: [
                    { title: 'Arena Games Platform launch', isDone: false },
                    { title: 'Arena Games SDK release', isDone: false },
                    { title: 'NFT Tracking Implemented', isDone: false },
                    { title: 'P2E Modes Release', isDone: false },
                    { title: 'Scholarship Program Launch', isDone: false },
                    { title: 'AI integration', isDone: false },
                ],
            },
            {
                title: 'Q3-Q4 2023',
                order: 'order-5 xl:order-4',
                points: [
                    { title: 'Arena Wallet release', isDone: false },
                    { title: 'Flash/ Board Games Integration', isDone: false },
                    { title: 'DegameFi Service DAO Launch', isDone: false },
                    { title: 'Onboarding of new games', isDone: false },
                ],
            },
        ],
    },

    tokenomics: {
        name: 'TOKENOMICS',
        title: 'Token Economics',
        table: {
            header: {
                pool: 'POOL',
                price: 'AMT PRICE',
                raised: 'RAISED',
                percent: '%',
                tokens: 'TOKENS',
            },
            body: [
                {
                    pool: 'SEED',
                    price: '$0,08832',
                    raised: '$132,480',
                    percent: '1.5',
                    tokens: '1 500 000',
                    color: '#284160',
                },

                {
                    pool: 'Private Sale',
                    price: '$0,1200',
                    raised: '$600,000',
                    percent: '5',
                    tokens: '5 000 000',
                    color: '#3a4f69',
                },
                {
                    pool: 'IDO / IEO',
                    price: '$0,2000',
                    raised: '$300,000',
                    percent: '1.5',
                    tokens: '1 500 000',
                    color: '#486282',
                },
                {
                    pool: 'Liquidity',
                    price: '',
                    raised: '',
                    percent: '3',
                    tokens: '3 000 000',
                    color: '#6784a8',
                },
                {
                    pool: 'Team / Development',
                    price: '',
                    raised: '',
                    percent: '21',
                    tokens: '21 000 000',
                    color: '#7298c7',
                },
                {
                    pool: 'Ecosystem Rewards',
                    price: '',
                    raised: '',
                    percent: '51.50',
                    tokens: '51 500 000',
                    color: '#81ace1',
                },
                {
                    pool: 'Advisors',
                    price: '',
                    raised: '',
                    percent: '4',
                    tokens: '4 000 000',
                    color: '#537caf',
                },
                {
                    pool: 'Treasury / Reserve',
                    price: '',
                    raised: '',
                    percent: '12',
                    tokens: '12 000 000',
                    color: '#355b9e',
                },
                {
                    pool: 'Airdrop',
                    price: '',
                    raised: '',
                    percent: '0.5',
                    tokens: '500 000',
                    color: '#2e5394',
                },
            ],
            footer: {
                pool: 'TOTAL',
                price: '',
                raised: '$1.032,480',
                percent: '100',
                tokens: '100 000 000',
            },
        },
    },
    team: {
        name: 'TEAM',
        title: 'OUR TEAM',
        person: [
            {
                name: 'Mikheil Didebulidze',
                post: 'Founder & CEO',
                img: '/about/team/u1.png',
                link: 'https://www.linkedin.com/in/mikheil-didebulidze-77548444/',
            },
            {
                name: 'Fehmi Fennia',
                post: 'CIO',
                img: '/about/team/u2.png',
                link: 'https://www.linkedin.com/in/fehmifennia/',
            },
            {
                name: 'Aleksandr Pogozhev',
                post: 'CTO',
                img: '/about/team/aleksandr-pogozhev.jpg',
                link: 'https://www.linkedin.com/in/aleksandr-pogozhev-6b61228a',
            },
            {
                name: 'Marie Giorgobiani',
                post: 'COO',
                img: '/about/team/u5.png',
                link: 'https://www.linkedin.com/in/marie-giorgobiani-3b7b571a8/',
            },
            {
                name: 'Mariia Danilova',
                post: 'Business Development Manager',
                img: '/about/team/mariia-danilova.jpg',
                link: 'https://www.linkedin.com/in/mariia-danilova-a75845164/',
            },
            {
                name: 'Guram Kashmadze',
                post: 'Blockchain Integration Leader',
                img: '/about/team/u3.png',
                link: 'https://www.linkedin.com/in/guramkashmadze/',
            },
            {
                name: 'David Skhiladze',
                post: 'Project manager',
                img: '/about/team/comand8.png',
                link: 'https://www.linkedin.com/in/davit-skhiladze-8194411b3/',
            },
            {
                name: 'Giorgi Shelegia',
                post: 'Game integration lead',
                img: '/about/team/comand9.png',
                link: 'https://www.linkedin.com/in/giorgi-shelegia-787a6082/',
            },
            {
                name: 'Fatih Iba',
                post: 'Communication Manager',
                img: '/about/team/Fatih.png',
                link: 'https://www.linkedin.com/in/fatihiba/',
            },
            {
                name: 'Georgiy Avaliani',
                post: 'Financial Manager',
                img: '/about/team/GeorgiyAvaliani.jpg',
                link: 'https://www.linkedin.com/in/georgiy-avaliani-ba744a43/',
            },
        ],
    },
    advisors: {
        name: 'Advisors',
        title: 'Advisors',
        person: [
            {
                name: 'Dominic Ryder',
                post: 'Founder & CEO at vEmpire DAO',
                img: '/about/advisors/DominicRyder.jpeg',
                link: 'https://www.linkedin.com/in/dominic-ryder-9024699a/',
            },
            {
                name: 'Alex Mur',
                post: 'Founder & CEO at OXO Capital',
                img: '/about/advisors/AlexMur.jpg',
                link: 'https://www.linkedin.com/in/alexmur/',
            },
            {
                name: 'Kema Bae',
                post: 'Co-founder at Sinofy Group',
                img: '/about/advisors/KemaBae.jpg',
                link: 'https://www.linkedin.com/in/kema-bae/',
            },
            {
                name: 'Nicholas Lo',
                post: 'BingX & OffChain Global',
                img: '/about/advisors/NicholasLo.jpg',
                link: 'https://www.linkedin.com/in/nicholas-web3',
            },
        ],
    },
    articlesAboutUs: {
        name: 'Articles about us',
        title: 'Featured in media',
        marks: [
            {
                title: 'Arena Games crowned champions at the AIBC GameFi Pitch',
                description: 'AIBC Article',
                img: '/about/articlesAboutUs/AIBCEurope.jpg',
                link: 'https://aibc.world/news/arena-games-crowned-champions-at-the-aibc-gamefi-pitch/',
            },
            {
                title: 'Entrepreneur Georgia about Arena Games',
                description: 'Entrepreneur',
                img: '/about/articlesAboutUs/Entrepreneur.jpg',
                link: 'https://www.facebook.com/photo.php?fbid=721297549365925&set=pb.100044570580199.-2207520000.&type=3',
            },
            {
                title: 'Forbes Georgia about Arena Games',
                description: 'Forbes',
                img: '/about/articlesAboutUs/Forbes.jpg',
                link: 'https://forbes.ge/en/arena-games-crowned-champions-at-the-aibc-gamefi-pitch/',
            },
            {
                title: 'BMG: Georgian startup Arena Games won AIBC`s GameFi Pitch',
                description: 'BMG',
                img: '/about/articlesAboutUs/bmg.jpg',
                link: 'https://www.youtube.com/watch?v=mHzTlDq8yfI',
            },
            {
                title: 'Arena Games at Degamefi Conference',
                description: 'COINTELEGRAPH.COM',
                img: '/about/articlesAboutUs/degamefiConf.png',
                link: 'https://cointelegraph.com/press-releases/degamefi-held-the-first-international-web3-conference-in-the-caucasus-region',
            },
            {
                title: 'Arena Games - Moving Games to Blockchain',
                description: 'Business Media Georgia',
                img: '/about/articlesAboutUs/n8.jpg',
                link: 'https://youtu.be/wCsxleS9QgU',
            },
            {
                title: 'Arena Games COO speaking at Binance Community Event',
                description: 'MARKETER.GE',
                img: '/about/articlesAboutUs/n7.jpg',
                link: 'https://www.marketer.ge/the-first-ever-binance-event-took-place-in-tbilisi-georgia/',
            },
            {
                title: 'Arcane Merge Blending Gaming with Finance',
                description: 'COINSPEAKER.COM',
                img: '/about/articlesAboutUs/n1.jpg',
                link: 'https://www.coinspeaker.com/arena-master-blending-gaming-with-finance/',
            },
            {
                title: 'Arcane Merge: Enhancing the Gaming Experience',
                description: 'BLOCKONOMI.COM',
                img: '/about/articlesAboutUs/n2.jpg',
                link: 'https://blockonomi.com/arena-master-enhancing-the-gaming-experience/',
            },
            {
                title: 'Transformation of traditional games into Web3',
                description: 'BM.GE',
                img: '/about/articlesAboutUs/n3.jpg',
                link: 'https://bm.ge/ka/tv-inner/tibisi-startaperis-partniori---sambrela/30183',
            },
            {
                title: 'Arcane Merge is about to launch its token on BSC',
                description: 'Webounty.io',
                img: '/about/articlesAboutUs/n4.jpg',
                link: 'https://www.webounty.io/Arena-Master-is-about-to-launch-its-token-on-BSC-',
            },
            {
                title: 'Sambrela: talking about upcoming projects',
                description: 'BM.GE',
                img: '/about/articlesAboutUs/n5.jpg',
                link: 'https://bm.ge/ka/tv-inner/tbc-startaperis-partniori---sambrela/25500',
            },
            {
                title: 'Arcane Merge attended the WOW Summit in Dubai',
                description: 'WOWSUMMIT.NET',
                img: '/about/articlesAboutUs/n6.jpg',
                link: 'https://www.linkedin.com/posts/arena-master_nft-crypto-dubai-activity-6915652013443686400-_cEu?utm_source=linkedin_share&utm_medium=ios_app',
            },
        ],
    },
    partners: {
        name: 'Partners',
        title: 'OUR Partners',
        images: [
            { img: '/about/partners/np1.png', href: 'https://sambrela.com/' },
            { img: '/about/partners/bot-planet.png', href: 'https://www.botpla.net/' },
            { img: '/about/partners/blockchain-centre.png', href: 'https://blockchaincentre.io/' },
            { img: '/about/partners/plan9-logo.png', href: 'https://plan9.tech/' },
            { img: '/about/partners/np6.png', href: 'https://gotbit.io/' },
            { img: '/about/partners/vEmpire.png', href: 'https://www.vemp.xyz/' },
            { img: '/about/partners/np19.png', href: 'https://www.farcana.com/' },
            { img: '/about/partners/np21.png', href: 'https://coinracer.io/' },

            { img: '/about/partners/cheelee.png', href: 'https://cheelee.io/' },
            { img: '/about/partners/binance-pay.png', href: 'https://pay.binance.com/en' },
            { img: '/about/partners/sola-defy.png', href: 'https://www.soladefy.io/' },
            { img: '/about/partners/alpaca-finance.png', href: 'https://www.alpacafinance.org/' },
            { img: '/about/partners/ape-swap.png', href: 'https://apeswap.finance/' },
            { img: '/about/partners/supra-oracles.png', href: 'https://supraoracles.com/' },

            { img: '/about/partners/avisa-games.png', href: 'https://avisagamesguild.com/' },
            { img: '/about/partners/crypto-executives.png', href: 'https://cryptoexecutives.io/' },
            { img: '/about/partners/oxo-capital.png', href: 'https://oxocapital.fund/' },
            { img: '/about/partners/mok.png', href: 'https://themok.io/#/' },
            { img: '/about/partners/wizardia.png', href: 'https://wizardia.io/' },
            { img: '/about/partners/orcdao.png', href: 'https://www.orcdao.io/' },
            { img: '/about/partners/placewar.png', href: 'https://placewar.io/' },
            { img: '/about/partners/galaxyarea.png', href: 'https://galaxyarena.io/' },
            { img: '/about/partners/sakura.png', href: 'https://sakuraplanet.io/' },
        ],
    },
    partnersTitle: {
        name: 'Partners',
        title: 'OUR Partners',
    },

    getInTouch: {
        name: 'GET IN TOUCH',
        title: 'For partnerships & content creation',
        description:
            'Interestingly, there is no limit to growing your skills in-game, and we ensure this by ranking you based on your skills and rewarding you with our token as you grow in skills.',
        form: {
            placeholders: {
                name: 'Enter your name',
                email: 'Enter your Email',
                message: 'Enter your message',
            },
            button: 'Get in touch',
        },
    },
    footer: {
        aboutUs: 'About Us',
        form: {
            title: 'Get the last updates',
            placeholder: 'example@gmai.com',
            button: 'Subscribe',
        },
        contactUs: { title: 'Contact us', email: 'hello@arenavs.com' },
        explore: 'Explore',
        games: 'Games',
        joinUs: 'Join us',
        marketplace: 'Marketplace',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        rights: '(C) All rights reserved',
        blog: 'Blog',
        community: 'Join our community',
        creators: 'Arena. All rights reserved.',
    },
    modalFormForDevelopers: {
        title: 'For Developers',
        form: {
            placeholders: {
                name: 'Enter Your Name',
                email: 'Enter Your Email',
                website: 'Enter Your Website (if any)',
                presentation: 'Enter Your Game Presentation (link)',
                message: 'Enter your message',
            },
            button: 'Apply',
        },
    },
    modalFormForAmbassador: {
        title: 'Become Ambassador',
        form: {
            placeholders: {
                name: 'Enter Your Name',
                email: 'Enter Your Email',
                social: 'Enter Your Social Media Link',
                expertise: 'Choose your expertise',
                message: 'How are you going to help the Project',
            },
            button: 'Apply',
            expertiseItems: [
                'Influencer',
                'Content Creator',
                'Meetup Organizer',
                'Moderator',
                'Translator',
                'Other',
            ],
        },
    },
    contactPopup: {
        name: 'THANK YOU',
        title: 'WE WILL CONTACT YOU!',
    },
}
