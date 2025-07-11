import { FC } from 'react'

import Image from 'next/image'

import { Game } from 'common-types/game'
import SmallButton from 'components/common/ui/buttons/smallButton'

export const GameBanner: FC<Game.TGameBanner> = ({
    maxWidthForDescription,
    image,
    game,
    bgImage,
    description,
    blur,
}) => {
    return (
        <div className="relative">
            <Image
                src={bgImage}
                alt="slide bg"
                width={1384}
                height={400}
                className="absolut inset-0 rounded-2xl"
            />
            <div className="absolute inset-0 flex items-center justify-between">
                <div
                    className="flex h-full items-center bg-cover bg-no-repeat"
                    style={{ paddingRight: blur.padding }}
                >
                    <Image
                        src={blur.image}
                        alt={`${game} bg`}
                        height={400}
                        width={blur.width}
                        className="absolute inset-0 h-full w-fit rounded-l-2xl"
                    />
                    <div
                        className="relative flex flex-col gap-5 pl-17.5"
                        style={{ maxWidth: maxWidthForDescription }}
                    >
                        <div className="flex items-center gap-1">
                            {game.icon && (
                                <Image
                                    src={game.icon}
                                    alt={`${game.title} icon`}
                                    width={52}
                                    height={72}
                                />
                            )}
                            <div className="max-w-[10.9375rem] text-custom-3xl-some font-bold">
                                {game.title}
                            </div>
                        </div>
                        <div className="text-custom-s">{description}</div>
                        <SmallButton className="w-fit">See more</SmallButton>
                    </div>
                </div>

                {image.src ? (
                    <Image
                        src={image.src}
                        className="h-full w-fit"
                        alt="slide logo"
                        width={image.width}
                        height={400}
                    />
                ) : null}
            </div>
        </div>
    )
}
