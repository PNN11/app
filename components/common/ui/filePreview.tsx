import { FC, useEffect, useState } from 'react'

import CloseSvg from 'components/svg/closeSvg'
import FileLoadedIcon from 'components/svg/fileLoadedIcon'
import { formatBytes } from 'utils/math/formatBytes'

interface FilePreviewProps {
    name: string
    size: number
    timeLeft: number
    progress: number
    onDeleteFile: () => void
}

const FilePreview: FC<FilePreviewProps> = ({ name, progress, size, timeLeft, onDeleteFile }) => {
    const [isUploaded, setIsUploaded] = useState(false)

    useEffect(() => {
        if (progress >= 100 && !isUploaded) {
            const timeout = setTimeout(() => setIsUploaded(true), 1000)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [progress, isUploaded])

    return (
        <div className="rounded-2xl bg-base-800 py-3 px-4">
            <div className="mb-3 flex items-start justify-between gap-4">
                <div className="font-medium">{name}</div>
                {progress === 100 && !isUploaded && <FileLoadedIcon />}
                {isUploaded && (
                    <button onClick={onDeleteFile} type="button">
                        <CloseSvg className="cursor-pointer" />
                    </button>
                )}
            </div>
            <div className="mb-2 flex items-center justify-between gap-4 text-custom-xs text-base-200">
                <div className="flex gap-2">
                    <div className="stat">{formatBytes(size)}</div>
                    {!!timeLeft && <div className="stat">{timeLeft} seconds left</div>}
                </div>
                {!isUploaded && <div>{progress}%</div>}
            </div>
            {!isUploaded && (
                <div className="h-1 w-full rounded bg-base-500">
                    <div
                        style={{ width: `${progress ?? 0}%` }}
                        className="h-full rounded bg-cta transition-all duration-500"
                    />
                </div>
            )}
        </div>
    )
}

export default FilePreview
