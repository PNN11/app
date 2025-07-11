import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

const posts = [
    {
        src: '/images/mediaKit/post_1.png',
        route: 'https://twitter.com/Arenaweb3/status/1718345880841932962',
    },
    {
        src: '/images/mediaKit/post_2.png',
        route: 'https://twitter.com/2040World/status/1729835318650589208',
    },
    {
        src: '/images/mediaKit/post_3.png',
        route: 'https://twitter.com/Arenaweb3/status/1730214813215687150',
    },
]

const Posts: FC = () => {
    return (
        <BlockWrapper className="xl:mb-40">
            <TitleWithDescription title="Our Twitter posts" classes={{ title: 'mb-6' }} />
            <div className="flex flex-wrap justify-center gap-5" data-aos="fade-zoom-in">
                {posts.map(el => (
                    <Link key={el.src} href={el.route}>
                        <Image width={421} height={239} alt="post" src={el.src} />
                    </Link>
                ))}
            </div>
        </BlockWrapper>
    )
}

export default Posts
