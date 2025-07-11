import { Head, Html, Main, NextScript } from 'next/document'

import { SESAME_APP_ID } from 'utils/constants/sesame'

const Document = (): JSX.Element => {
    return (
        <Html>
            <Head>
                <meta data-lel />
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOOGLE_ANALYTICS_ID}`}
                />
                <script
                    async
                    src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                />
                <script
                    async
                    src="https://sesamelabs.xyz/api/static/scripts/sesameWidget.js"
                    data-sesame-id={SESAME_APP_ID}
                />
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document
