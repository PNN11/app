import { UseMutationResult, useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { Game } from 'common-types/game'
import useServiceStore from 'store/service'
import { QueryKeys } from 'utils/constants/reactQuery'
import { HttpError } from 'utils/httpError'

const SUCCESSFUL_MINT_MESSAGE =
    'You have successfully minted your asset, you can see all your assets and NFT in inventory tab'

const useMintGameAsset = (): UseMutationResult<
    Game.MintGameAssetResponse,
    HttpError,
    {
        assetId: string
    },
    unknown
> => {
    const gameService = useServiceStore(s => s.gameService)
    const queryClient = useQueryClient()

    const mintMutation = useMutation(gameService.mintGameAsset, {
        onError(error: HttpError) {
            toast(error?.message)
        },
        async onSuccess() {
            toast.success(SUCCESSFUL_MINT_MESSAGE)
            await Promise.allSettled([
                queryClient.invalidateQueries({ queryKey: QueryKeys.GET_ALL_GAMES_ASSETS }),
                queryClient.invalidateQueries({ queryKey: QueryKeys.GET_MY_GAMES_ASSETS }),
            ])
        },
    })

    return mintMutation
}

export default useMintGameAsset
