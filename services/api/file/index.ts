import { HttpError } from '../../../utils/httpError'

import { FileCore } from 'common-types/file'
import axiosClient from 'services/axios'

export class FileService {
    uploadProfileImage = async (file: any): Promise<FileCore.UploadFile> => {
        const formData = new FormData()

        formData.append('profileImage', file)

        const responce = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_FS_URL}/api/upload`,
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        )

        if (responce.status > 400) throw new HttpError(responce.data.message, responce.status)

        return responce.data
    }
}

const fileService = new FileService()

export default fileService
