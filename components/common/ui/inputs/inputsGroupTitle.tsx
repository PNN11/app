import { FC } from 'react'

interface Props {
    title: string
}

const InputsGroupTitle: FC<Props> = ({ title }) => {
    return <h5 className="mb-4 text-custom-lg font-medium">{title}</h5>
}

export default InputsGroupTitle
