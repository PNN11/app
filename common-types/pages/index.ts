import { Core } from '../core';
import { MainPage } from '../mainPage';

export const pageOptions = [
  {
    label: 'Main page',
    value: 'main_page',
  },
  {
    label: 'About us',
    value: 'about_us',
  },
  {
    label: 'For partners',
    value: 'for_partners',
  },
  {
    label: 'For community',
    value: 'for_community',
  },
  {
    label: 'INO',
    value: 'ino',
  },
] as const;

type ExtractValues<T extends Readonly<Array<{ value: string }>>> = T[number]['value'];

export namespace Pages {
  export type FieldOptions = typeof pageOptions;

  export type Options = ExtractValues<typeof pageOptions>;

  type TitleWithDescription = { title: string; description: string };

  type TitleWithSubTitleAndDescription = TitleWithDescription & { subTitle: string };

  export type FeatureCard = TitleWithDescription & {
    button: string;
  };

  export type GamesText = TitleWithDescription & {
    button: string;
  };

  export type Socials = {
    twitter: string;
    instagram: string;
    medium: string;
    discord: string;
    telegram: string;
    linkedin: string;
  };

  export type BaseResponse = { id: string; title: string; createdAt: string; updatedAt: string };

  export type AboutUsTextContent = BaseResponse & {
    page: 'about_us';
    banner: TitleWithDescription & {
      subtitle: string;
    };
    features: {
      title: string;
      cards: {
        firstCard: FeatureCard;
        secondCard: FeatureCard;
        thirdCard: FeatureCard;
        fourthCard: FeatureCard;
      };
    };
    ecosystem: TitleWithDescription;
    team: TitleWithDescription;
    advisors: {
      title: string;
    };
    games: GamesText;
    discord: MainPage.MainPageDiscord;
    twitterPostLink: string;
    socials: Socials;
  };

  export type IntroductionCard = {
    title: string;
    description: {
      descriptionPoint: string;
      id: string;
    }[];
    button: string;
  };

  export type MainPageTextContent = BaseResponse & {
    page: 'main_page';
    banners: MainPage.MainPageBanner[];
    introduction: TitleWithDescription & {
      cards: {
        firstCard: IntroductionCard;
        secondCard: IntroductionCard;
        thirdCard: IntroductionCard;
      };
    };
    nftBlock: TitleWithDescription & {
      button: string;
    };
    games: GamesText;
    discord: MainPage.MainPageDiscord;
    twitterPostLink: string;
    socials: Socials;
  };

  export type AdvantageCard = TitleWithDescription;
  export type FeatureForGamesCard = TitleWithDescription;
  export type TestimonialCard = { testimonial: string; author: string };

  export type ForPartnersTextContet = BaseResponse & {
    page: 'for_partners';
    banner: TitleWithDescription & {
      actionButton: string;
    };
    advantages: TitleWithSubTitleAndDescription & {
      actionButton: string;
      cards: {
        firstCard: AdvantageCard;
        secondCard: AdvantageCard;
        thirdCard: AdvantageCard;
        fourthCard: AdvantageCard;
        fifthCard: AdvantageCard;
      };
    };
    featuresForGames: TitleWithDescription & {
      cards: {
        firstCard: FeatureForGamesCard;
        secondCard: FeatureForGamesCard;
        thirdCard: FeatureForGamesCard;
        fourthCard: FeatureForGamesCard;
      };
    };
    becomePartner: {
      title: string;
      card: IntroductionCard;
    };
    scholarship: TitleWithDescription & {
      actionButton: string;
    };
    testimonials: TitleWithDescription & {
      cards: {
        firstCard: TestimonialCard;
        secondCard: TestimonialCard;
        thirdCard: TestimonialCard;
      };
    };
    submitGame: TitleWithDescription & {
      actionButton: string;
    };
  };

  export type ForCommunityTextContent = BaseResponse & {
    page: 'for_community';
    banner: TitleWithSubTitleAndDescription & {
      actionButton: string;
    };
    rewards: TitleWithSubTitleAndDescription & {
      actionButton: string;
    };
    becomeAmbassador: TitleWithSubTitleAndDescription & {
      actionButton: string;
    };
    gamesCommunity: TitleWithSubTitleAndDescription;
    games: TitleWithSubTitleAndDescription & {
      button: string;
    };
    discord: MainPage.MainPageDiscord;
    twitterPostLink: string;
    socials: Socials;
  };

  export type Pass = {
    title: string;
    description: string;
    type: string;
  };

  type PrivelegeDescription = {
    title: string;
    imageCaption: string;
    descriptionText: string;
    description: {
      descriptionPoint: string;
      id: string;
    }[];
  };

  export type INOPageTextContent = BaseResponse & {
    page: 'ino';
    banner: TitleWithSubTitleAndDescription & { actionButton: string; link: string };
    arenaPasses: TitleWithDescription & {
      passes: {
        pass: Pass;
      }[];
    };
    genesisCollection: TitleWithDescription & {
      card: {
        text: string;
        description: {
          descriptionPoint: string;
          id: string;
        }[];
      };
    };
    privileges: {
      title: string;
      perks: PrivelegeDescription;
      journey: PrivelegeDescription;
    };
    registerToWhitelist: TitleWithDescription & {
      actionButton: string;
      link: string;
    };
    socials: Socials;
  };

  export type PagesTextRequestResponse = {
    about_us: AboutUsTextContent;
    main_page: MainPageTextContent;
    for_partners: ForPartnersTextContet;
    for_community: ForCommunityTextContent;
    ino: INOPageTextContent;
  };

  export type PagesRequestFunc = <K extends keyof PagesTextRequestResponse>(
    params: Core.PaginatedRequestBaseParams & { page: K }
  ) => Promise<Core.PaginatedResponse<PagesTextRequestResponse[K]>>;
}
