import { FC } from 'react'

interface IWrapperForm {
    title: string | JSX.Element
    children: JSX.Element
    classes?: { root?: string; container?: string }
}

const WrapperForm: FC<IWrapperForm> = ({
    title,
    children,
    classes: { root, container } = {
        root: 'min-h-screen pt-28 pb-14',
        container: '',
    },
}) => {
    return (
        <div className={`w-full ${root}`}>
            <div
                className={`mx-auto max-w-162 rounded-xl border border-base-700 bg-bg p-5 sm:p-8 ${container}`}
            >
                <div className="mb-6 text-custom-3xl font-bold">{title}</div>
                {children}
            </div>
        </div>
    )
}

export default WrapperForm
