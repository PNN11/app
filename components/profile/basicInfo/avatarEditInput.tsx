import { ChangeEvent, Dispatch, FC } from 'react'

import Image from 'next/image'

const imageMime =
    'image, image/gif, image/jpeg, image/pjpeg , image/png, image/svg+xml, image/tiff, image/vnd.microsoft.icon, image/vnd.wap.wbmp, image/webp'

interface AvatarEditInputProps {
    onFileChanged: Dispatch<File>
    image: string
}

const AvatarEditInput: FC<AvatarEditInputProps> = ({ onFileChanged, image }) => {
    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            onFileChanged(e.target.files[0])
        }
    }

    return (
        <label htmlFor="avatar-input" className="group">
            <div className="invisible absolute inset-0 bg-bg/60 group-hover:visible" />
            <div className="profileEditing invisible absolute inset-0 cursor-pointer group-hover:visible" />
            <input
                accept={imageMime}
                onChange={handleChangeFile}
                type="file"
                id="avatar-input"
                className="absolute inset-0 cursor-pointer opacity-0"
            />
            <Image
                className="h-17 w-17 object-cover"
                src={image}
                width={100}
                height={100}
                alt="User logo"
            />
        </label>
    )
}

export default AvatarEditInput
