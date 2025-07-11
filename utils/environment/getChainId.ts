import { Web3Core } from 'common-types/web3core'
import { dev, prod } from '.'

export default function () {
    return dev.value(Web3Core.EChainID.TPOLYGON, prod.value(Web3Core.EChainID.POLYGON))
}
