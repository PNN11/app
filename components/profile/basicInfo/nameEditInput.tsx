import { Dispatch, FC, SetStateAction } from 'react'

interface INameEditInput {
    name: string
    setName: Dispatch<SetStateAction<string>>
}

const NameEditInput: FC<INameEditInput> = ({ name, setName }) => {
    return (
        <input
            className={`max-w-28 mr-1 w-full rounded-5 border border-cta bg-transparent 
                            py-1.5 px-3 text-custom-2xl font-bold`}
            value={name}
            onChange={e => {
                setName(e.target.value)
            }}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
        />
    )
}

export default NameEditInput
