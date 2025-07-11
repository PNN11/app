import { createContext, FC, ReactNode, useMemo, useState } from 'react'

import { TextContentType } from 'utils/types/TextContentType'

interface ILanguageContext {
    dictionary: TextContentType
    setDictionary: (pageText: TextContentType) => void
}

const LanguageContext = createContext<ILanguageContext>({
    dictionary: {} as TextContentType,
    setDictionary: () => {},
})

interface Props {
    children: ReactNode
    dictionaryProp: TextContentType
}

const LanguageContextProvider: FC<Props> = ({ children, dictionaryProp }) => {
    const [dictionary, setDictionary] = useState<TextContentType>(dictionaryProp as TextContentType)

    const value = useMemo(() => ({ dictionary, setDictionary }), [dictionary])

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export default LanguageContext

export { LanguageContextProvider }
