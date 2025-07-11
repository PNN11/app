/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { FC, useEffect, useRef, useState } from 'react'

import { useField } from 'formik'
import { toast } from 'react-toastify'

import SmallButton from '../buttons/newSmallButton'
import FilePreview from '../filePreview'

import InputsGroupTitle from './inputsGroupTitle'

import PictureIcon from 'components/svg/pictureIcon'
import { useDragNDrop } from 'hooks/useDragNDrop'
import useServiceStore from 'store/service'

export interface FileInputProps {
    title: string
    name: string
    isSubmitted: boolean
}

type TFilePreview = {
    name: string
    size: number
    uuid: string
    id: string
    progress: number
    timeLeft: number
}

type TFilesPreview = Map<string, Partial<TFilePreview>>

const slug = 'forms-media'

const fileLimitInBytes = 10485760

const FileInput: FC<FileInputProps> = ({ title, name, isSubmitted }) => {
    const [, , helper] = useField<{ image: string }[]>(name)
    const [filesIds, setFilesIds] = useState<{ image: string }[]>([])

    const input = useRef<HTMLInputElement>(null)
    const [filesPreview, setFilesPreview] = useState<TFilesPreview>(new Map())
    const formsService = useServiceStore(store => store.formsService)

    const previewRef = useRef<TFilesPreview>()
    const submitted = useRef(isSubmitted)

    const { ref } = useDragNDrop(e => {
        uploadFiles(e.dataTransfer.files)
    })

    const uploadFiles = async (files: FileList): Promise<void> => {
        if (!files.length) return

        for (const file of Array.from(files)) {
            if (file?.size > fileLimitInBytes) {
                toast('Maximum file size is 10 Mb')

                continue
            }
            setFilesPreview(prev => {
                prev.set(file.name, { name: file.name, size: file.size })

                return new Map(prev)
            })

            const formData = new FormData()

            formData.append('file', file)
            formData.append('_payload', '')

            const res = await formsService.uploadFile({
                file: formData,
                slug,
                onUploadProgress(progressEvent) {
                    setFilesPreview(prev => {
                        prev.set(file.name, {
                            ...prev.get(file.name),
                            progress: Math.round(progressEvent.progress * 100),
                            timeLeft: Math.round(
                                (progressEvent.total - progressEvent.loaded) / progressEvent.rate
                            ),
                        })

                        return new Map(prev)
                    })
                },
            })

            if (res?.doc) {
                setFilesPreview(prev => {
                    prev.set(file.name, {
                        ...prev.get(file.name),
                        id: res.doc.id,
                        uuid: res.doc.uuid,
                    })

                    return new Map(prev)
                })

                setFilesIds(prev => [...prev, { image: res.doc.id }])
            } else {
                setFilesPreview(prev => {
                    prev.delete(file.name)

                    return new Map(prev)
                })
            }
        }
    }

    const deleteFile = async (uuid: string, name: string, id: string): Promise<void> => {
        await formsService.deleteFile({ uuid, slug })

        setFilesPreview(prev => {
            prev.delete(name)

            return new Map(prev)
        })

        setFilesIds(prev => prev.filter(item => item.image !== id))
    }

    useEffect(() => {
        submitted.current = isSubmitted
    }, [isSubmitted])

    useEffect(() => {
        helper.setValue(filesIds)
    }, [filesIds])

    useEffect(() => {
        previewRef.current = filesPreview
    }, [filesPreview])

    useEffect(() => {
        return () => {
            if (!submitted?.current && previewRef?.current?.size) {
                previewRef.current.forEach(item => {
                    formsService.deleteFile({ uuid: item.uuid, slug })
                })
            }
        }
    }, [])

    return (
        <div>
            <InputsGroupTitle title="Attachments" />
            <h5 className="mb-1">{title}</h5>
            <div
                className="mb-4 flex flex-col items-center gap-5 border border-dashed border-base-300 py-3"
                ref={ref}
            >
                <input
                    ref={input}
                    className="hidden"
                    name={name}
                    type="file"
                    multiple
                    onChange={e => uploadFiles(e.target.files)}
                />
                <div className="flex flex-col items-center gap-2">
                    <PictureIcon />
                    <div>Drop the file here to download</div>
                </div>
                <SmallButton onClick={() => input?.current?.click()}>Upload file</SmallButton>
            </div>
            {!!filesPreview.size && (
                <div className="mb-4 space-y-2">
                    {Array.from(filesPreview.values()).map(
                        ({ name, progress, size, timeLeft, uuid, id }) => (
                            <FilePreview
                                key={name}
                                name={name}
                                progress={progress}
                                size={size}
                                timeLeft={timeLeft}
                                onDeleteFile={() => deleteFile(uuid, name, id)}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    )
}

export default FileInput
