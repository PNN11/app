import { FC, useState } from 'react'

import Image from 'next/image'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import AvatarEditInput from './avatarEditInput'
import UserBalances from './balance'
import CopyButton from './copyButton'
import NameEditInput from './nameEditInput'

import Skeleton from 'components/common/skeleton'
import ValueWithTooltip from 'components/common/ui/valueWithTooltip'
import { useGetUserInfo, useGetUserInfoState } from 'hooks/useGetUserInfo'
import { useHydrated } from 'hooks/useHydrated'
import fileService from 'services/api/file'
import userService from 'services/api/user'
import useUserStore from 'store/useUserStore'
import { HttpError } from 'utils/httpError'
import { maskInfo } from 'utils/mask-info'

const fileLimitInBytes = 5242880

interface IBasicInfo {}

const BasicInfo: FC<IBasicInfo> = () => {
    const accessToken = useUserStore(state => state.accessToken)
    const setUserName = useUserStore(state => state.setUserName)

    const userId = useUserStore(state => state.userId)
    const userName = useUserStore(state => state.userName)

    const image = useUserStore(state => state.image)

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [personalName, setPersonalName] = useState<string>(userName)
    const getUserInfo = useGetUserInfo()

    const isLoading = useGetUserInfoState()
    const isHydrated = useHydrated()

    const uploadMutation = useMutation(fileService.uploadProfileImage, {
        onSuccess() {},
        onError(error: HttpError) {
            toast(error?.message)
        },
    })

    const updateProfileMutation = useMutation(userService.updateProfile, {
        onSuccess() {
            setUserName(personalName)
            getUserInfo()
        },
        onError(error) {
            if (error instanceof HttpError) toast(error.message)
            setPersonalName(userName)
        },
    })

    const updateProfileName = async (): Promise<void> => {
        if (accessToken && personalName !== userName) {
            updateProfileMutation.mutate({ username: personalName })
        }
        setIsEditing(false)
    }

    const updateProfileAvatar = async (imgFile: File): Promise<void> => {
        if (imgFile && imgFile.size > fileLimitInBytes) {
            toast('Maximum file size is 5 Mb')

            return
        }

        if (accessToken && imgFile) {
            const files = await uploadMutation.mutateAsync(imgFile)

            updateProfileMutation.mutate({ image: files[0].name })
        }
    }

    return (
        <div className="mb-3 flex flex-col justify-between gap-5 sm:flex-row sm:flex-wrap md:mb-4 md:items-center">
            <div className="grid grid-cols-max-fr gap-x-5">
                <div className="relative h-17 w-17 overflow-hidden rounded-full">
                    <Skeleton isLoading={isLoading || !isHydrated} classes={{ skeleton: 'h-full' }}>
                        <AvatarEditInput
                            image={image || '/img/defaultPhoto.jpg'}
                            onFileChanged={updateProfileAvatar}
                        />
                    </Skeleton>
                </div>
                <div className="">
                    <div className="flex items-center gap-x-1">
                        {isEditing ? (
                            <NameEditInput name={personalName} setName={setPersonalName} />
                        ) : (
                            <Skeleton classes={{ skeleton: 'w-23' }} isLoading={isLoading}>
                                <ValueWithTooltip
                                    value={isHydrated ? userName : ''}
                                    className="max-w-[60vw] text-custom-3xl font-bold"
                                />
                            </Skeleton>
                        )}
                        <div>
                            {isEditing ? (
                                <div
                                    onClick={updateProfileName}
                                    className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-cta"
                                >
                                    <Image
                                        src="/img/check.svg"
                                        alt="confirm"
                                        width={12}
                                        height={8}
                                    />
                                </div>
                            ) : (
                                <Image
                                    src="/img/edit.svg"
                                    alt="edit"
                                    className="cursor-pointer"
                                    height={20}
                                    width={20}
                                    onClick={() => {
                                        setIsEditing(true)
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <Skeleton isLoading={isLoading}>
                        <CopyButton value={userId}>
                            {`id ${isHydrated ? maskInfo(userId) : ''}`}
                        </CopyButton>
                    </Skeleton>
                </div>
            </div>
            <div className="flex w-full flex-wrap items-center gap-1.5 sm:w-auto lg:flex-nowrap">
                {/*  <ExternalInlineLink href="">Buy AGP token on Pancakeswap</ExternalInlineLink> */}
                {/* {walletAddress && isConnect ? (
                    <button
                        onClick={openDeposit}
                        type="button"
                        className="self-start text-cta underline underline-offset-4 md:self-end"
                    >
                        Deposit
                    </button>
                ) : null} */}

                <UserBalances />
            </div>
        </div>
    )
}

export default BasicInfo
