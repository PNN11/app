import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean> // Return success

function useCopyToClipboard(): [CopyFn, boolean, CopiedValue] {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false)
            }, 2000)
        }
    }, [copied])

    const copy: CopyFn = async text => {
        if (!navigator?.clipboard) {
            return false
        }

        // Try to save to clipboard then save it in the state if worked
        try {
            await navigator.clipboard.writeText(text)
            setCopiedText(text)
            setCopied(true)

            return true
        } catch (error) {
            setCopiedText(null)
            toast('Failed to copy')

            return false
        }
    }

    return [copy, copied, copiedText]
}

export default useCopyToClipboard
