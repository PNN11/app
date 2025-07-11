/* eslint-disable jsx-a11y/anchor-has-content */
import { FC, useEffect } from 'react'

import Head from 'next/head'

import BlockTitle from 'components/common/ui/title/blockTitle'

interface Props {
    link: string
}

let count = 0

const TwitterNews: FC<Props> = ({ link }) => {
    useEffect(() => {
        count += 1
    }, [])

    return (
        <>
            <Head>
                <script async src={`https://platform.twitter.com/widgets.js?${count}`} />
            </Head>
            <div className="rounded-3xl bg-bg px-8 py-6" data-aos="fade-zoom-in">
                <BlockTitle>Twitter Updates</BlockTitle>

                <blockquote
                    className="twitter-tweet"
                    data-theme="dark"
                    data-chrome="nofooter noborders"
                    data-align="center"
                >
                    <a target="_blank" rel="noreferrer" className="text-xl" href={link}>
                        Join Twitter of Arena Gamers to stay up to date
                    </a>
                </blockquote>
            </div>
        </>
    )
}

export default TwitterNews
