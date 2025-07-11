import usePairs from 'hooks/usePairs'
import useSwapRate from 'hooks/useSwapRate'

const useGetUsdToAmtSwapRate = (): number => {
    const usdtId =
        process.env.NEXT_PUBLIC_DISPLAY === 'development'
            ? process.env.NEXT_PUBLIC_DEV_USDT_ID
            : process.env.NEXT_PUBLIC_MAIN_USDT_ID

    const amtId = process.env.NEXT_PUBLIC_AMT_ID

    const [, pairs] = usePairs(amtId, 10)

    const rate = useSwapRate(amtId, usdtId, pairs)

    return rate
}

export default useGetUsdToAmtSwapRate
