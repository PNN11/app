import { FC, useMemo } from 'react'

import { Social } from './social'

import { Pages } from 'common-types/pages'
import InstagramIcon from 'components/svg/instagramIcon'
import Medium from 'components/svg/medium'
import Telegram from 'components/svg/telegram'

interface Props {
    classes?: { iconWrapper?: string }
    socials: Pages.Socials
}

const SocialUpdates: FC<Props> = ({ classes = { iconWrapper: '' }, socials }) => {
    const icons = useMemo(
        () => [
            {
                name: 'instagram',
                link: socials?.instagram,
                Icon: InstagramIcon,
            },
            { name: 'telegram', link: socials?.telegram, Icon: Telegram },
            { name: 'medium', link: socials?.medium, Icon: Medium },
        ],
        [socials]
    )

    return (
        <div>
            <h5 className="mb-5 text-center text-custom-2.5xl font-medium" data-aos="fade-zoom-in">
                Also you can follow the most important updates here
            </h5>
            <div data-aos="fade-up">
                <Social
                    icons={icons}
                    classes={{
                        icon: 'max-w-[3rem] max-h-12',
                        iconWrapper: `w-17 h-17 bg-bg ${classes.iconWrapper}`,
                        wrapper: 'justify-center',
                    }}
                />
            </div>
        </div>
    )
}

export default SocialUpdates
