export const analyticEvents = {
    registration: 'registration',
} as const

type RegisterEvent = {
    event: 'registration'
    options: { method: 'email' }
}

type FormsOptions = {
    formName:
        | 'for_ambassadors'
        | 'for_partners'
        | 'subscribe'
        | 'ido-whitelist'
        | 'nft-giveaway'
        | 'tank-master-whitelist'
}

type SubmitFormEvent = {
    event: 'submit_form'
    options: FormsOptions
}

type OpenConnectWalletEvent = {
    event: 'PopUpConnect_your_wallet'
    options?: {}
}

type WalletSelectEvent = {
    event: 'wallet_selected'
    options: { walletName: string }
}

type WalletConnectedEvent = {
    event: 'wallet_connected'
    options: {
        walletName: string
        blockchain: string
        wallet: string
    }
}

type PurchaseEvent = {
    event: 'purchase'
    options: {
        transaction_id: string
        currency: string
        value: number
        items: [
            {
                item_name: string
                price: number
                quantity: number
            }
        ]
    }
}

type DepositEvent = { event: 'deposit'; options: { deposit_value: number } }

type SpinRaffleEvent = {
    event: 'SpinWheel'
    options?: {}
}

export type AnalyticsEvents =
    | RegisterEvent
    | SubmitFormEvent
    | OpenConnectWalletEvent
    | WalletSelectEvent
    | WalletConnectedEvent
    | PurchaseEvent
    | DepositEvent
    | SpinRaffleEvent
