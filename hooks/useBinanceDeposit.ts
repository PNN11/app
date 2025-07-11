import { useMutation, UseMutationResult } from 'react-query'
import { toast } from 'react-toastify'

import useServiceStore from 'store/service'
import { HttpError } from 'utils/httpError'

const useBinanceDeposit = (
    onSuccess: (redirectUrl: string) => any
): UseMutationResult<{ redirectUrl: string }, unknown, { amount: number }> => {
    const swapService = useServiceStore(state => state.swapService)

    const depositBinanceMutation = useMutation(swapService.depositBinance, {
        onSuccess(data) {
            // const link = document.createElement('a')

            // link.href = data.redirectUrl
            // link.target = '_blank'
            // link.rel = 'noreferrer'
            // link.click()

            const newWindow = window.open()

            newWindow.location = data.redirectUrl

            onSuccess(data.redirectUrl)
        },
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
        },
    })

    return depositBinanceMutation
}

export default useBinanceDeposit
