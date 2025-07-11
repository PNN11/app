import { FC } from 'react'

import Link from 'next/link'

import { Pages } from 'common-types/pages'
import SocialUpdates from 'components/common/social/updates'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import BlockWithPhoneWrapper from 'components/common/wrappers/blockWithPhone'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

interface Props {
    title: string
    description: string
    actionButton: string
    link: string
    socials: Pages.Socials
}

const RegisterToWhitelist: FC<Props> = ({ description, title, actionButton, link, socials }) => {
    return (
        <Container>
            <BlockWrapper>
                <BlockWithPhoneWrapper
                    image="/images/ino/phone.png"
                    background="bg-deep-blue"
                    classes={{ wrapper: 'mb-20' }}
                >
                    <TitleWithDescription
                        classes={{ title: 'text-start', description: 'text-start' }}
                        title={title}
                        description={description}
                    />
                    <Link target="_blank" href={link}>
                        <SmallButton className="w-full sm:w-fit" variant="outlined">
                            {actionButton}
                        </SmallButton>
                    </Link>
                </BlockWithPhoneWrapper>
                <SocialUpdates socials={socials} classes={{ iconWrapper: 'bg-base-700' }} />
            </BlockWrapper>
        </Container>
    )
}

export default RegisterToWhitelist
