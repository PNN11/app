import { FC, useEffect, useState } from 'react'

import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

import Referral from './referral'

import Table from 'components/common/table'
import { PaginationBlock } from 'components/marketplace/paginationBlock'
import Loader from 'components/svg/loader'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'
import { HttpError } from 'utils/httpError'

type ReferralTableProps = {
    newCode?: boolean
}

const limit = 10

const ReferralTable: FC<ReferralTableProps> = ({ newCode }) => {
    const referralService = useServiceStore(state => state.referralService)
    const [page, setPage] = useState(0)

    const { data: referrals, isLoading } = useQuery(
        [QueryKeys.ALL_REFERRAL_CODES, page],
        ({ signal }) =>
            referralService.getCodes({
                limit: limit.toString(),
                offset: (page * limit).toString(),
                signal,
            }),
        {
            onError(error) {
                if (error instanceof HttpError) toast(error.message)
            },
            refetchOnMount: 'always',
            refetchOnWindowFocus: false,
        }
    )

    useEffect(() => {
        if (newCode) setPage(0)
    }, [newCode])

    return (
        <Table className="rounded-5 bg-base-700">
            <div className="grid grid-cols-referral-table gap-x-4 border-b border-base-600 px-5 py-3">
                <h5>Link</h5>
                <h5>Name</h5>
                <h5 className="text-right">Guests</h5>
                <h5 className="text-right">Referrals</h5>
                <h5 className="text-right">Reward</h5>
                <h5 className="text-right">Bonus Rewards</h5>
            </div>
            <Table.Scroll />
            <div className="divide-y divide-base-600">
                {!isLoading && !!referrals?.docs?.length
                    ? referrals.docs.map((referral, index) => (
                          <Referral
                              referral={referral}
                              key={referral.referralCode}
                              index={index}
                              newCode={newCode}
                          />
                      ))
                    : null}
                {isLoading ? (
                    <div className="grid place-items-center py-2">
                        <Loader color="currentColor" />
                    </div>
                ) : null}
                {!isLoading && !referrals?.docs?.length ? (
                    <div className="flex justify-center px-5 py-3">No codes was found</div>
                ) : null}
                <PaginationBlock
                    totalCount={referrals?.totalDocs}
                    count={referrals?.docs?.length}
                    page={page}
                    setPage={setPage}
                    pageSize={limit}
                    isLoading={isLoading}
                    className="py-3 px-5 text-custom-xs"
                />
            </div>
            {/* <Table.Scroll /> */}
        </Table>
    )
}

export default ReferralTable
