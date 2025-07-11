import { Dispatch, FC, SetStateAction, useMemo } from 'react'

import Input from 'components/marketplace/filter/input'

type PropsType = {
    from: string
    fromPlaceholder: string
    setFrom: Dispatch<SetStateAction<string>>
    setTo: Dispatch<SetStateAction<string>>
    to: string
    toPlaceholder: string
    validate?: 'float' | 'integer'
    min?: number
    max?: number
}

export const FromToInputs: FC<PropsType> = ({
    from,
    setFrom,
    fromPlaceholder,
    to,
    setTo,
    toPlaceholder,
    validate = 'integer',
    min = 0,
    max = Infinity,
}) => {
    const regexp = useMemo(
        () => (validate === 'integer' ? /^[0-9]\d*$/ : /^[0-9]+(.[0-9]{1,3})?$/),
        [validate]
    )

    return (
        <>
            <div className="flex items-center justify-center gap-2 px-0.5">
                <Input
                    value={from}
                    onKeyDown={e => {
                        if (e.key === '+' || e.key === '-') {
                            e.preventDefault()
                        }
                    }}
                    setValue={value => {
                        if ((regexp.test(value) && +value >= min) || value === '') {
                            setFrom(value)
                        }
                    }}
                    type="number"
                    placeholder={fromPlaceholder}
                    className="text-center"
                />
                <span className="flex items-center">to</span>
                <Input
                    value={to}
                    onKeyDown={e => {
                        if (e.key === '+' || e.key === '-') {
                            e.preventDefault()
                        }
                    }}
                    setValue={value => {
                        if ((regexp.test(value) && +value <= max) || value === '') {
                            setTo(value)
                        }
                    }}
                    type="number"
                    placeholder={toPlaceholder}
                    className="text-center"
                />
            </div>
            {from && to && +from > +to ? (
                <div className="text-error">Maximum value must be greater than minimum</div>
            ) : null}
        </>
    )
}
