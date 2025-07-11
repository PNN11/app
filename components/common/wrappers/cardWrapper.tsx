import { FC, ReactNode } from 'react'

type CardWrapperPropsType = {
    children: ReactNode
}

export const CardWrapper: FC<CardWrapperPropsType> = ({ children }) => {
    return (
        <div className="group h-full rounded-2xl hover:drop-shadow-[0px_0px_12px_rgba(255,83,133,0.5)] focus:border-2 focus:border-blue-bright focus:outline-none">
            <div className="h-full rounded-2xl bg-base-700">
                <div className="flex h-full flex-col rounded-2xl hover:bg-base-600 group-focus:px-1.5 group-focus:pb-3.5 group-focus:pt-1.5">
                    {children}
                </div>
            </div>
        </div>
    )
}
