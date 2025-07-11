import { nftTracking } from 'middlewares/factories/nftTracking'
import { chainMiddlewares } from './middlewares'
import { onlyDevelopment } from 'middlewares/factories/development'

const middlewares = [onlyDevelopment, nftTracking]

export default chainMiddlewares(middlewares)
