import { FC } from 'react'

import PersonCardList from './list'

import { Pages } from 'common-types/pages'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

const mock = {
    title: 'Meet the Arena Games Team',
    description:
        'Our experienced team of industry veterans and visionary advisors are dedicated to driving the success of Arena Games. With diverse backgrounds spanning gaming, blockchain, finance, and technology, our team is well-equipped to revolutionize the future of gaming.',
    members: [
        {
            image: '/images/aboutUsPage/team/Mikheil Didebulidze.png',
            name: 'Mikheil Didebulidze',
            position: 'Founder & CEO',
            link: 'https://www.linkedin.com/in/mikheil-didebulidze-77548444/',
        },
        {
            image: '/images/aboutUsPage/team/Fehmi Fennia.png',
            name: 'Fehmi Fennia',
            position: 'CIO',
            link: 'https://www.linkedin.com/in/fehmifennia/',
        },
        {
            image: '/images/aboutUsPage/team/Alex Pogozhev.png',
            name: 'Aleksandr Pogozhev',
            position: 'Technical Officer',
            link: 'https://www.linkedin.com/in/aleksandr-pogozhev-6b61228a',
        },
        {
            image: '/images/aboutUsPage/team/Marie Giorgobiani.png',
            name: 'Marie Giorgobiani',
            position: 'COO',
            link: 'https://www.linkedin.com/in/marie-giorgobiani-3b7b571a8/',
        },
        {
            image: '/images/aboutUsPage/team/Guram Kashmadze.png',
            name: 'Guram Kashmadze',
            position: 'Blockchain Architecture Lead',
            link: 'https://www.linkedin.com/in/guramkashmadze/',
        },
        {
            image: '/images/aboutUsPage/team/Giorgi Tsitlidze.png',
            name: 'Giorgi Tsitlidze',
            position: 'Marketing Manager',
            link: 'https://www.linkedin.com/in/giorgi-tsitlidze-14b12467',
        },

        {
            image: '/images/aboutUsPage/team/David Skhiladze.png',
            name: 'David Skhiladze',
            position: 'Project Manager',
            link: 'https://www.linkedin.com/in/davit-skhiladze-8194411b3/',
        },
        {
            image: '/images/aboutUsPage/team/Fatih Iba.png',
            name: 'Fatih Iba',
            position: 'Junior Product Manager',
            link: 'https://www.linkedin.com/in/fatihiba/',
        },
    ],
}

type TeamProps = Pages.AboutUsTextContent['team']

const Team: FC<TeamProps> = ({ description, title }) => {
    return (
        <BlockWrapper>
            <TitleWithDescription
                title={title}
                description={description}
                classes={{ title: 'text-38 lg:text-38' }}
            />
            <PersonCardList list={mock.members} />
        </BlockWrapper>
    )
}

export default Team
