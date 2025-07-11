import { useInView } from 'react-intersection-observer'

const useStopVideoOutOfView = (): ((node?: Element) => void) => {
    const { ref } = useInView({
        onChange(inView, entry) {
            const target = entry.target as HTMLVideoElement

            if (inView) {
                target.play()
            } else {
                target.pause()
            }
        },
    })

    return ref
}

export default useStopVideoOutOfView
