import { useEffect, useState } from 'react'

export const useThirdPartyCookieCheck = (): boolean => {
    const [isSupported, setIsSupported] = useState<boolean>()

    useEffect(() => {
        const frame = document.createElement('iframe')

        frame.id = '3pc'
        frame.src = 'https://pnn11.github.io/check_3rdp_cookies/read-cookie.html' // Add your hosted domain url here
        frame.style.display = 'none'
        frame.style.position = 'fixed'
        document.body.appendChild(frame)

        function listen(event): void {
            if (event.data === '3pcSupported' || event.data === '3pcUnsupported') {
                setIsSupported(event.data === '3pcSupported')
                document.body.removeChild(frame)
                window.removeEventListener('message', listen)
            }
        }

        window.addEventListener('message', listen, false)

        return () => {
            document.body.removeChild(frame)
            window.removeEventListener('message', listen)
        }
    }, [])

    return isSupported
}
