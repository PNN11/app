import { FC, useContext, useState } from 'react'

import Image from 'next/image'

import BlockTitle from 'components/common/ui/title/blockTitle'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'
import LanguageContext from 'components/context/LanguageContext'
import PlayIcon from 'components/svg/playIcon'

const VideoBlock: FC = () => {
    const {
        dictionary: {
            videoBlock: { image, title, video },
        },
    } = useContext(LanguageContext)

    const [videoLink, setVideoLink] = useState('')
    const [playing, setPlaying] = useState(false)

    const handlePlayVideo = (): void => {
        setPlaying(true)
        setVideoLink(video)
    }

    return (
        <BlockWrapper>
            <Container className="text-white">
                <BlockTitle>{title}</BlockTitle>
                <div className="relative">
                    <Image src={image} width={1312} height={738} alt={title} />
                    <button
                        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer"
                        type="button"
                        onClick={handlePlayVideo}
                    >
                        <PlayIcon className="w-12 md:w-auto" />
                    </button>
                    <iframe
                        width="560"
                        height="315"
                        src={videoLink}
                        title="Arena Games video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className={`absolute inset-0 h-full w-full ${playing ? '' : 'hidden'}`}
                    />
                </div>
            </Container>
        </BlockWrapper>
    )
}

export default VideoBlock
