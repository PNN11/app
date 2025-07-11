type TextContentType = {
    header: {
        buttons: {
            home: string
            aboutUs: string
            games: string
            documentation: { title: string; subMenuItems: { title: string; link: string }[] }
            ourTeam: string
            partners: string
            login: string
            marketplace: string
            swap: string
            blog: string
        }
        comingSoon: string
    }
    bannersSlider: {
        image: string
        title: string
        description: string
        firstButton: { title: string; link: string }
        secondButton?: string
    }[]
    gamesBlock: { title: string; button: { title: string; link: string }; games: GameType[] }
    marketplaceBlock: { title: string; button: string; nftCards: Nft[]; description: string }
    videoBlock: { title: string; image: string; video: string }
    discordBlock: {
        title: string
        image: string
        button: { title: string; link: string }
    }
    newsBlock: {
        title: string
        twitterTitle: string
        button: string
        news: News[]
    }
    faq: { question: string; answers: { title: string; description: string }[] }[]
    main: TitleType & {
        title2: string
        mainText: string
        buttons: {
            forDevelopers: string
            forGamers: string
            becomeAmbassador: string
        }
    }
    aboutUs: TitleType & {
        description: string
        slider: (InfoBlock & { img: string })[]
        call: InfoBlock
        pros: InfoBlock[]
        applyButton: string
    }
    games: TitleType & {
        games: Game[]
        comingSoon: string
        appStoreImg: string
        googlePlayImg: string
    }
    nft: TitleType & {
        nftSlider: {
            game: string
            type: { title: string; color: string }
            rarity: string
            button: string
            img: string
            imgBg: string
            imgTitle: string
        }[]
        ambassadorProgram: {
            title: string
            looking: { title: string; looking: string[] }
            benefits: string[]
            description: string
            applyButton: string
        }
    }
    token: TitleType & {
        utility: (InfoBlock & { img: string })[]
    }
    promoVideo: TitleType
    roadMap: TitleType & {
        steps: RoadmapStepType[]
    }

    tokenomics: TitleType & {
        table: {
            header: TableRow
            body: (TableRow & { color: string })[]
            footer: TableRow
        }
    }
    team: TitleType & {
        person: Person[]
    }
    advisors: TitleType & {
        person: Person[]
    }
    articlesAboutUs: TitleType & {
        marks: (InfoBlock & { img: string; link: string })[]
    }
    partners: TitleType & { images: { img: string; href: string }[] }
    partnersTitle: { name: string; title: string }

    getInTouch: TitleType & {
        description: string
        form: FormType
    }
    footer: {
        explore: string
        games: string
        marketplace: string
        aboutUs: string
        joinUs: string
        contactUs: { title: string; email: string }
        terms: string
        privacy: string
        form: { title: string; placeholder: string; button: string }
        rights: string
        blog: string
        community: string
        creators: string
    }
    modalFormForDevelopers: {
        title: string
        form: FormType<{ website: string; presentation: string }>
    }
    modalFormForAmbassador: {
        title: string
        form: FormType<{ social: string; expertise: string }> & { expertiseItems: string[] }
    }
    contactPopup: TitleType
}

type InfoBlock = { title: string; description: string }
type TitleType = { name: string; title: string }
type TableRow = {
    pool: string
    price: string
    raised: string
    percent: string
    tokens: string
}
type GeneralFormPlaceholdersType = { name: string; email: string; message: string }
type FormType<T = {}> = {
    placeholders: GeneralFormPlaceholdersType & T
    button: string
}
type Game = {
    title: string
    img: string
    imgBg: string
    video: string
    titleImg: string
    appStoreLink: string
    googlePlayLink: string
}
type Person = { name: string; post: string; img: string; link: string }
type RoadmapStepType = {
    title: string
    order: string
    points: { title: string; isDone: boolean }[]
}

export type GameType = {
    title: string
    description: string
    image: string
    active: boolean
    tags: ('Desktop' | 'iOS' | 'Android')[]
    nftCount?: number
    id?: string
}

export type Nft = {
    _id: string
    currency: { symbol: string }
    priceAmount: number
    preview?: string
    rarity?: string
    payload: {
        game: { title: string }
        logo: string

        name: string
    }
}

export type News = {
    image: string
    title: string
    description: string
    createdAt: number
    id: string
}

export type { TableRow, TextContentType, Person, RoadmapStepType }

export type Pers = {
    photo: Media
    name: string
    position: string
    link: string
    id: string
}

export interface Media {
    id: string
    url: string
    filename?: string
    mimeType?: string
    filesize?: number
    width?: number
    height?: number
    createdAt: string
    updatedAt: string
}

export interface Documentation {
    id: string
    locale?: 'fr' | 'en' | 'ru'
    title?: string
    documents: {
        document?: string
        url?: string
        id?: string
    }[]
    createdAt: string
    updatedAt: string
}

export type Quarter = {
    quarter: string
    isDone?: boolean
    points: {
        point: string
        isDone?: boolean
        id?: string
    }[]
    id?: string
}

export interface Roadmap {
    id: string
    locale?: 'fr' | 'en' | 'ru'
    title?: string
    header: string
    backdropHeader: string
    quarters: Quarter[]
    createdAt: string
    updatedAt: string
}

export interface TeamMember {
    id: string
    locale?: 'fr' | 'en' | 'ru'
    title?: string
    header: string
    backdropHeader: string
    members: Pers[]
    createdAt: string
    updatedAt: string
}

export interface Advisor {
    id: string
    locale?: 'fr' | 'en' | 'ru'
    title?: string
    header: string
    backdropHeader: string
    advisors: Pers[]
    createdAt: string
    updatedAt: string
}

export interface Post {
    id: string
    locale?: 'fr' | 'en' | 'ru'
    title?: string
    header: string
    backdropHeader: string
    posts: {
        media: Media
        link: string
        name: string
        source: string
        id: string
    }[]
    createdAt: string
    updatedAt: string
}

export interface Partner {
    id: string
    title?: string
    logo: Media
    createdAt: string
    updatedAt: string
}

export interface LandingGeneral {
    id: string
    locale?: 'fr' | 'en' | 'ru'
    title?: string
    advisors: Advisor
    partners: Partner[]
    documents: Documentation
    mediaPosts: Post
    roadmap: Roadmap
    team: TeamMember
    createdAt: string
    updatedAt: string
}
