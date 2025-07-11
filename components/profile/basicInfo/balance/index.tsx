import { FC } from 'react'

import WalletBalance from './wallet'
import BalancesWrapper from './wrapper'

import useWalletStore from 'store/useWalletStore'

// const balancesComponentsMap = new Map<string, FC<BalanceProps>>([
//     ['AMT', AmtInternalBalance],
//     ['AGP', InternalBalance],
//     ['MATIC', MaticInternalBalance],
// ])

const UserBalances: FC = () => {
    const activeWallet = useWalletStore(store => store.activeWallet)
    // const [currenciesWithAmount, isLoading] = useGetUserBalances()
    // const isHydrated = useHydrated()

    return (
        <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap">
            {/* <BalancesWrapper
                icon="/logop.svg"
                classes={{
                    wrapper: 'items-start',
                    childrenWrapper: 'sm:py-2',
                }}
            >
                <div className="flex  items-center gap-2 sm:w-auto">
                    <div className="flex  flex-wrap items-center gap-1.5 sm:w-auto">
                        {isHydrated &&
                            currenciesWithAmount?.map(({ icon, _id, symbol, amount }) => {
                                const Component = balancesComponentsMap.get(symbol)

                                if (!Component) {
                                    console.error(`Component for currency ${symbol} not founded`)

                                    return null
                                }

                                return (
                                    <Component
                                        key={_id}
                                        icon={icon}
                                        value={amount}
                                        isLoading={isLoading}
                                    />
                                )
                            })}
                    </div>
                </div>
            </BalancesWrapper> */}

            <BalancesWrapper icon={activeWallet.icon} classes={{ wrapper: 'justify-start' }}>
                <WalletBalance />
            </BalancesWrapper>
        </div>
    )
}

export default UserBalances
