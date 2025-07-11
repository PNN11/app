import { FC, useMemo } from 'react'

import Link from 'next/link'
import { useQuery } from 'react-query'

import SubscribeForm from 'components/common/forms/subscribe'
import { Social } from 'components/common/social/social'
import FooterLink from 'components/common/ui/footerLink'
import FooterTitle from 'components/common/ui/title/footerTitle'
import { Container } from 'components/common/wrappers/container'
import DiscordIcon from 'components/svg/discord'
import InstagramIcon from 'components/svg/instagramIcon'
import LinkedinIcon from 'components/svg/linkedinIcon'
import Medium from 'components/svg/medium'
import Telegram from 'components/svg/telegram'
import Twitter from 'components/svg/twitter'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'

export const Footer: FC = () => {
    const currentYear = useMemo(() => new Date().getFullYear(), [])
    const pageService = useServiceStore(store => store.pageService)

    const { data } = useQuery(QueryKeys.MAIN_PAGE_TEXT, () =>
        pageService.getPageContent({ page: 'main_page', limit: '10', offset: '0' })
    )

    const socials = useMemo(() => data?.docs?.[0]?.socials, [data])

    const icons = useMemo(
        () => [
            {
                name: 'twitter',
                link: socials?.twitter,
                Icon: Twitter,
            },
            { name: 'discord', link: socials?.discord, Icon: DiscordIcon },
            { name: 'linkedin', link: socials?.linkedin, Icon: LinkedinIcon },
            { name: 'telegram', link: socials?.telegram, Icon: Telegram },
            { name: 'medium', link: socials?.medium, Icon: Medium },
            {
                name: 'instagram',
                link: socials?.instagram,
                Icon: InstagramIcon,
            },
        ],
        [socials]
    )

    return (
        <Container className=" pt-8 pb-4 text-base-100 ">
            <div className="mb-4 grid grid-cols-4 gap-y-6 pb-4 md:grid-cols-8 xl:grid-cols-12">
                <SubscribeForm className="col-span-4 xl:col-span-3" />
                <div className="col-span-full space-y-2 md:col-span-2 md:col-start-7 xl:col-start-6">
                    <FooterTitle>Explore</FooterTitle>
                    <FooterLink href="/about">Arena Games</FooterLink>

                    <FooterLink href="/media-kit">Media Kit</FooterLink>
                </div>
                <div className="col-span-full space-y-2 md:col-span-2 md:col-start-1 xl:col-start-8">
                    <FooterTitle>Docs</FooterTitle>
                    <FooterLink href="/unitysdk">Unity SDK</FooterLink>
                </div>
                <div className="col-span-full xl:col-span-3 xl:col-start-10">
                    <FooterTitle>Join Us</FooterTitle>
                    <Social
                        icons={icons}
                        classes={{ wrapper: 'mb-6', iconWrapper: 'bg-base-700' }}
                    />
                    <FooterTitle>Contact us</FooterTitle>
                    <Link
                        className="text-custom-base text-link md:text-base"
                        href="mailto:hello@arenavs.com"
                    >
                        hello@arenavs.com
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-y-4 border-t border-t-base-700 py-5 text-custom-sl text-base-300 md:grid-cols-8 xl:grid-cols-12">
                <div className="col-span-3">2022 - {currentYear} (C) All rights reserved</div>
                <Link
                    href="/terms"
                    target="_blank"
                    className="col-span-2 block md:col-start-5 xl:col-start-8"
                >
                    Terms of Service
                </Link>
                <Link
                    href="/policy"
                    target="_blank"
                    className="col-span-2 block md:col-start-7 xl:col-start-10"
                >
                    Privacy Policy
                </Link>
            </div>
        </Container>
    )
}
