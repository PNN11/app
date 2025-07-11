import { FC } from 'react'

import Badge from '../referralInfo/badge'

import Skeleton from 'components/common/skeleton'
import { useGetUserInfoState } from 'hooks/useGetUserInfo'

interface IProfileEmailInfo {
    title: string
    email: string
    isConfirmed: boolean
    onChangeButtonClick: () => Promise<void> | void
}

const ProfileEmailInfo: FC<IProfileEmailInfo> = ({
    title,
    email,
    onChangeButtonClick,
    isConfirmed,
}) => {
    const isLoading = useGetUserInfoState()

    return (
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-base-700 py-4 px-5 text-base md:grid-cols-3">
            <p className="order-1 w-full opacity-70">{title}</p>
            <div className="order-3 col-span-2 flex w-full gap-4 md:order-2 md:col-span-1">
                <Skeleton isLoading={isLoading}>
                    <div className="relative flex gap-4">
                        <p>{email}</p>
                        {!isConfirmed ? (
                            <Badge
                                className="whitespace-nowrap bg-base-400"
                                title="Not Confirmed"
                            />
                        ) : null}
                    </div>
                </Skeleton>
            </div>
            <button
                type="button"
                className="order-2 w-full text-right text-cta md:order-3"
                onClick={onChangeButtonClick}
            >
                {`${isConfirmed ? 'Change' : 'Confirm'} email`}
            </button>
        </div>
    )
}

export default ProfileEmailInfo
