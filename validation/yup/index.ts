import * as number from './number'
import * as string from './string'

export default { string, number } as { string: typeof string; number: typeof number }
