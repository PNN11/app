import { FC, ReactNode, useEffect } from 'react'

import Aos from 'aos'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'

import Header from 'components/common/header/header'
import { Footer } from 'components/mainPage/footer/footer'
import { MountPoint } from 'components/modals/promissify'
import CloseSvg from 'components/svg/closeSvg'
import { qanelas } from 'fonts/qanelas'
import { useConnectWalletAfterAccountsChanged } from 'hooks/useAccountsChanged'
import useGetMnemonic from 'hooks/useGetMnemonic'
import useSesameAuth from 'hooks/useSesameAuth'
import { useInitAuth } from 'store/service'
import { useInitFilter } from 'store/useFilterStore'
import useUserStore from 'store/useUserStore'
import { META_DESCRIPTION, META_IMAGE_URL } from 'utils/constants/meta'

interface Props {
    children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => {
    const userId = useUserStore(state => state.userId)

    useEffect(() => {
        Aos.init({ duration: 700, once: true })
        window.history.scrollRestoration = 'manual'
    }, [])

    useConnectWalletAfterAccountsChanged()
    useInitAuth()
    useInitFilter()
    useGetMnemonic()
    useSesameAuth()

    return (
        <>
            <Head>
                <title>ARENA GAMES</title>
                <meta property="og:url" content="https://arenavs.com/" key="og:url" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="ARENA GAMES" />
                {/* <meta property="og:title" content="ARENA GAMES" key="og:title" /> */}
                <meta property="og:description" content={META_DESCRIPTION} key="og:description" />
                <meta property="og:image" content={META_IMAGE_URL} key="og:image" />

                <meta name="twitter:site" content="https://arenavs.com/" key="twitter:site" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="ARENA GAMES" />
                <meta
                    name="twitter:description"
                    content={META_DESCRIPTION}
                    key="twitter:description"
                />
                <meta name="twitter:image" content={META_IMAGE_URL} key="twitter:image" />
                <meta name="description" content={META_DESCRIPTION} key="description" />

                <link rel="apple-touch-icon" sizes="80x80" href="/80.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/152.png" />
                <link rel="apple-touch-icon" sizes="167x167" href="/167.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/180.png" />
                <link rel="icon" sizes="180x180" href="/180.png" />
                <link rel="icon" href="/favicon.ico" />
                <script
                    id={`google-analytics${userId ?? ''}`}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GOOOGLE_ANALYTICS_ID}', {
                        page_path: window.location.pathname,
                        user_id: '${userId || 'unauthorized'}'
                        });
                        `,
                    }}
                />
            </Head>
            <div className="isolate">
                <div className={`grid min-h-screen grid-cols-1 ${qanelas.className}`}>
                    <div>
                        <Header />
                        <main className="bg-bg">{children}</main>
                    </div>
                    <div className="self-end">
                        <Footer />
                    </div>
                </div>
                <div id="modals" className="relative z-20" />
                <ToastContainer
                    hideProgressBar
                    closeButton={<CloseSvg />}
                    position="top-center"
                    limit={1}
                    icon={false}
                />
            </div>
            <div className="sticky bottom-0">
                <div id="bottom-menu" />
            </div>
            <MountPoint />
        </>
    )
}

export default RootLayout
