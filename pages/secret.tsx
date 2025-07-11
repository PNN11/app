import { NextPage } from 'next'

import PageWrapper from 'components/common/wrappers/pageWrapper'

const Secret: NextPage = () => {
    return (
        <PageWrapper>
            <div className="grid min-h-screen place-items-center px-5 text-center">
                <div className="rainbow mb-1 h-max text-2xl font-semibold uppercase">
                    LOOKS like you found a secret page!
                </div>
            </div>
        </PageWrapper>
    )
}

export default Secret
