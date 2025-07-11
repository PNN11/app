import { createQueryStore } from '../../../utils/createQueryStore'

import { FILTER_KEY } from './const'

export const useFilterState = createQueryStore(FILTER_KEY)
