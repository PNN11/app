import { FC } from 'react'

import { useInView } from 'react-intersection-observer'

import PassInfo from './pass'

interface Props {
    title: string
    description: string
    type: string
    onInViewChange: ({ inView, type }: { inView: boolean; type: string }) => void
}

const TrackPassVisibilityWrapper: FC<Props> = ({ description, title, onInViewChange, type }) => {
    const { ref } = useInView({
        threshold: 1,
        onChange(inView) {
            onInViewChange({ inView, type })
        },
    })

    return <PassInfo ref={ref} title={title} description={description} />
}

export default TrackPassVisibilityWrapper
