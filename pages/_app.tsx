import 'aos/dist/aos.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'
import '../styles/prism.css'

import { FC, useState } from 'react'

import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import RootLayout from 'components/loyout/rootLayout'

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <RootLayout>
                    <Component {...pageProps} />
                </RootLayout>
            </Hydrate>
        </QueryClientProvider>
    )
}

export default App
