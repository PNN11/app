import { FC } from 'react'

import { useQuery } from 'react-query'

import SubmitButton from 'components/authorization/form/submitButton'
import useWalletStore from 'store/useWalletStore'
import { waitTx } from 'utils/transactions/waitTx'

interface ITransactionWrapperProps {
    txHash?: string
    onDone: () => void
    children: any
}

const TransactionWrapper: FC<ITransactionWrapperProps> = ({ txHash, onDone, children }) => {
    const wallet = useWalletStore(store => store.activeWallet)

    const txResult = useQuery({
        queryKey: `wait-tx-${txHash}`,
        queryFn: () => waitTx({ hash: txHash, wallet }),
        enabled: Boolean(txHash),
        retry: 0,
    })

    if (!txHash) {
        return children
    }

    return (
        <div className="text-center text-2xl">
            {txResult.isLoading ? <p className="mb-6">Transaction in progress</p> : null}
            {txResult.isSuccess ? <p className="mb-6">Transaction was submitted</p> : null}
            {txResult.error ? <p className="mb-6">Transaction failed</p> : null}
            <SubmitButton
                onClick={onDone}
                isLoading={txResult.isLoading}
                disabled={txResult.isLoading}
            >
                Done
            </SubmitButton>
        </div>
    )
}

export default TransactionWrapper
