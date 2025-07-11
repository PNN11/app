import { Economics } from 'common-types/economics'

const useSwapRate = (from: string, to: string, pairs: Economics.IPair[]): number => {
    const pair = pairs?.find(pair => pair.fromCurrency._id === from && pair.toCurrency._id === to)

    return pair?.rate
}

export default useSwapRate
