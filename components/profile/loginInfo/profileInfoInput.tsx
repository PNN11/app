import { FC } from 'react'

interface IProfileInfoInput {
    title: string
    value: string
    type: string
    name: string
    onChangeButtonClick: () => Promise<void> | void
    disabled?: boolean
}

const ProfileInfoInput: FC<IProfileInfoInput> = ({
    title,
    value,
    type,
    onChangeButtonClick,
    disabled = false,
    name,
}) => {
    return (
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-base-700 py-4 px-5 text-base md:grid-cols-3">
            <label htmlFor={name} className="order-1 w-full opacity-70">
                {title}
            </label>
            <input
                readOnly
                type={type}
                name={name}
                value={value}
                disabled={disabled}
                id={name}
                className="order-3 col-span-2 w-full bg-transparent md:order-2 md:col-span-1"
            />
            <button
                type="button"
                className="order-2 w-full text-right text-cta md:order-3"
                onClick={onChangeButtonClick}
            >
                {`Change ${title.toLowerCase()}`}
            </button>
        </div>
    )
}

export default ProfileInfoInput
