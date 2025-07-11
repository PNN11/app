import { AxiosProgressEvent } from 'axios'

import { Core } from 'common-types/core'
import { FormTypes } from 'common-types/forms'
import { authAxiosClient } from 'services/axios'
import { RequestFn } from 'utils/types/api'

export default class FormsService {
    subscribe: RequestFn<{ email: string }, { ok: boolean }> = async value => {
        const response = await authAxiosClient.post(`/api/v1/form/subscription`, value)

        return response.data
    }

    submitDeveloperForm = async (value: any): Promise<void> => {
        await authAxiosClient.post(`/api/v1/form/developer`, value)
    }

    submitPartnershipForm = async (value: {
        name: string
        email: string
        message: string
    }): Promise<void> => {
        await authAxiosClient.post(`/api/v1/form/partnership`, value)
    }

    submitForm: FormTypes.SubmitFormFunc = async ({ form, ...params }) => {
        const response = await authAxiosClient.post(`/api/v01/forms?form=${form}`, params)

        return response.data
    }

    uploadFile: RequestFn<
        {
            file: FormData
            onUploadProgress: (progressEvent: AxiosProgressEvent) => void
            slug: string
        },
        { doc: Core.Media }
    > = async ({ file, onUploadProgress, slug }) => {
        const response = await authAxiosClient.post(
            `/api/v01/internal-upload-files/${slug}`,
            file,
            {
                onUploadProgress,
            }
        )

        return response.data
    }

    downloadFilefromLink: RequestFn<string, Blob> = async link => {
        const response = await authAxiosClient.get(link, { responseType: 'blob' })

        return response.data
    }

    deleteFile: RequestFn<{ uuid: string; slug?: string }, { ok: boolean }> = async ({
        uuid,
        slug,
    }) => {
        const response = await authAxiosClient.post(
            `/api/v01/delete-by-uuid/${uuid}`,
            {},
            { params: { slugCollection: slug } }
        )

        return response.data
    }
}
