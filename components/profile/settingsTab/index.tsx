import { FC, useState } from 'react'

import WrapperBlock from '../wrapperBlock'

import Skeleton from 'components/common/skeleton'
import CopyIcon from 'components/svg/copy'
import CrossedEye from 'components/svg/profile/crossedEye'
import Eye from 'components/svg/profile/eye'
import useCopyToClipboard from 'hooks/useCopyToClipboard'
import useGetMnemonic from 'hooks/useGetMnemonic'

const UserSettingsTab: FC = () => {
    const { data, isLoading } = useGetMnemonic()
    const [isVisible, setIsVisible] = useState(false)

    const [copy, copied] = useCopyToClipboard()

    return (
        <WrapperBlock title="Export seed phrase">
            <>
                <p className="mb-8 text-base-200">
                    Write these 12 words down in a safe place. You <b>MUST</b> have these words to
                    recover your account.
                    <br />
                    You will <b>NOT</b> be able to access your wallet funds and items without them.
                </p>

                <div className="flex items-center gap-4 px-1">
                    <Skeleton
                        classes={{ skeleton: 'max-w-xl h-6 rounded-xl' }}
                        isLoading={isLoading}
                    >
                        <div className={`text-lg font-medium ${isVisible ? '' : 'blur-sm'}`}>
                            {data?.seed}
                        </div>
                    </Skeleton>
                    <button
                        onClick={() => setIsVisible(prev => !prev)}
                        type="button"
                        className="rounded-full p-2 hover:bg-base-700"
                    >
                        {isVisible ? <CrossedEye /> : <Eye />}
                    </button>
                    <div className="relative flex items-center gap-4">
                        <button
                            onClick={() => copy(data.seed)}
                            type="button"
                            className="rounded-full p-2 hover:bg-base-700"
                        >
                            <CopyIcon className="h-6 w-6 stroke-base-100" />
                        </button>
                        {copied && (
                            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                                Copied
                            </span>
                        )}
                    </div>
                </div>
            </>
        </WrapperBlock>
    )
}

export default UserSettingsTab
