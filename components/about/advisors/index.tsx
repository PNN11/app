import { FC } from 'react'

import PersonCardList from '../team/list'

import { Pages } from 'common-types/pages'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

const mock = {
    title: 'Advisors Behind Arena Games',
    members: [
        {
            image: '/images/aboutUsPage/advisors/Dominic Ryder.png',
            name: 'Dominic Ryder',
            position: 'Founder & CEO at vEmpire DAO',
            link: 'https://www.linkedin.com/in/dominic-ryder-9024699a/',
        },
        {
            image: '/images/aboutUsPage/advisors/James Werkeiser.png',
            name: 'James Werkeiser',
            position: 'Lead, Growth & Marketing at FSL',
            link: 'https://www.linkedin.com/in/jameswerkeiser/',
        },
        {
            image: '/images/aboutUsPage/advisors/Kema Bae.png',
            name: 'Kema Bae',
            position: 'Gamefi Asia Expert',
            link: 'https://www.linkedin.com/in/kema-bae/',
        },
        {
            image: '/images/aboutUsPage/advisors/melizza-anievas.png',
            name: 'Melizza Anievas',
            position: 'Web3 GTM Strategy @ Animoca Brands',
            link: 'https://www.linkedin.com/in/melizza-anievas/',
        },
    ],
}

type AdvisorsProps = Pages.AboutUsTextContent['advisors']

const Advisors: FC<AdvisorsProps> = ({ title }) => {
    return (
        <BlockWrapper>
            <TitleWithDescription title={title} classes={{ title: 'text-38 lg:text-38' }} />
            <PersonCardList list={mock.members} />
        </BlockWrapper>
    )
}

export default Advisors
