import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'

export function getSpinsAmountFromNFT(
    nft: IMarketplaceToken.TBodyResponse,
    checkPrivileges: boolean = false
): number {
    if (!nft) return 0

    if (checkPrivileges && nft.payload.type === 'MINT' && nft.payload.isPrivilegesRemoved) return 0

    return (
        (nft.privileges &&
            (
                Object.values(nft.privileges)?.find(
                    item => item?.access?.[0]?.type === 'RAFFLE_FREE_SPIN'
                )?.access[0] as IMarketplaceToken.TRaffleFreeSpinAccess
            )?.countFreeSpin) ||
        0
    )
}
export function getMultiplierFromNFT(
    nft: IMarketplaceToken.TBodyResponse,
    checkPrivileges: boolean = false
): number {
    if (!nft) return 0

    if (checkPrivileges && nft.payload.type === 'MINT' && nft.payload.isPrivilegesRemoved) return 0

    return (
        (nft?.privileges &&
            (
                Object.values(nft.privileges)?.find(item =>
                    item?.access.find(access => access.type === 'RAFFLE_MULTIPLIER')
                )?.access[0] as IMarketplaceToken.TRaffleMultiplierAccess
            )?.multiplier) ||
        0
    )
}

export const getReferralMultiplierFromNFT = (
    nft: IMarketplaceToken.TBodyResponse,
    checkPrivileges: boolean = false
): number => {
    if (!nft) return 0

    if (checkPrivileges && nft.payload.type === 'MINT' && nft.payload.isPrivilegesRemoved) return 0

    return (
        (nft?.privileges &&
            (
                Object.values(nft.privileges)?.find(item =>
                    item?.access.find(access => access.type === 'REFERRAL_MULTIPLIER')
                )?.access[0] as IMarketplaceToken.TReferralMultiplierAccess
            )?.multiplier) ||
        0
    )
}
