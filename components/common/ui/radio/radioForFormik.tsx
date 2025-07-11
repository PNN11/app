import { FC } from 'react'

import { useField } from 'formik'

import Radio, { RadioPropsType } from 'components/common/ui/radio/radio'

const RadioForFormik: FC<RadioPropsType> = ({ name, ...restProps }) => {
    const [field, , helpers] = useField(name)

    return <Radio {...restProps} {...field} {...helpers} />
}

export default RadioForFormik
