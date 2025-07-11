import { useEffect, useState } from 'react'

export const useLocation = (): Location => {
    const [location, setLocation] = useState<Location | undefined>(undefined)

    useEffect(() => {
        setLocation(window.location)
    }, [])

    return location
}
