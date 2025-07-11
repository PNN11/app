import axios from 'axios'

import { AddHtmlError } from 'utils/axios/addHttpError'
import { dev } from 'utils/environment'

const ngrokHeader = { 'ngrok-skip-browser-warning': 'qwe' }

const axiosClient = AddHtmlError(
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: dev.value(ngrokHeader),
    })
)

export const authAxiosClient = AddHtmlError(
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: dev.value(ngrokHeader),
    })
)

export default axiosClient
