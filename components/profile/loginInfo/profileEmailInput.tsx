import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'

import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import Skeleton from 'components/common/skeleton'
import { useGetUserInfo, useGetUserInfoState } from 'hooks/useGetUserInfo'
import authService from 'services/api/auth'
import { HttpError } from 'utils/httpError'

interface IProfileEmailInput {
    title: string
}

const ProfileEmailInput: FC<IProfileEmailInput> = ({ title }) => {
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>
    const buttonRef = useRef() as MutableRefObject<HTMLButtonElement>
    const [value, setValue] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const getUserInfo = useGetUserInfo()
    const isLoading = useGetUserInfoState()

    const bindEmail = useMutation(authService.email.bindNewEmail, {
        onSuccess() {
            setValue('')
            getUserInfo()
        },
        onError(error: HttpError) {
            setValue('')
            toast(error.message)
        },
    })

    const handleClick = async (): Promise<void> => {
        if (!isEdit) {
            setIsEdit(true)
            inputRef.current.focus()

            return
        }

        await bindEmail.mutateAsync({ email: value })
    }

    useEffect(() => {
        const clickHandler = (e: MouseEvent): void => {
            if (e.target !== inputRef.current && e.target !== buttonRef.current) {
                setIsEdit(false)
            }
        }

        document.addEventListener('click', clickHandler)

        return () => {
            document.removeEventListener('click', clickHandler)
        }
    }, [])

    return (
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-base-700 py-4 px-5 text-base md:grid-cols-3">
            <label htmlFor="email-input" className="order-1 w-full opacity-70">
                {title}
            </label>
            <div className="order-3 col-span-2 flex w-full gap-4 md:order-2 md:col-span-1">
                <Skeleton isLoading={isLoading}>
                    <input
                        ref={inputRef}
                        type="email"
                        name="email"
                        value={value}
                        id="email-input"
                        onChange={e => setValue(e.target.value)}
                        className="w-full bg-transparent"
                    />
                </Skeleton>
            </div>
            <button
                type="button"
                ref={buttonRef}
                className="order-2 w-full text-right text-cta md:order-3"
                onClick={handleClick}
            >
                Add email
            </button>
        </div>
    )
}

export default ProfileEmailInput
