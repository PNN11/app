import { FC } from 'react'

import NftAccordionWrapper from './nftAccordionWrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'

interface SkillsProps {
    skills: IMarketplaceToken.MarketplaceTokenSkill[]
}

const Skills: FC<SkillsProps> = ({ skills }) => {
    if (!skills?.length) return null

    return (
        <NftAccordionWrapper title="Skills">
            <div className="grid grid-cols-6 gap-4 md:grid-cols-8 lg:grid-cols-12">
                {skills?.length ? (
                    skills.map(({ maxLength, value, label }) => (
                        <div
                            key={label}
                            className="col-span-3 mb-4 flex gap-2 font-medium s:col-span-2 md:col-span-4"
                        >
                            <div className="flex h-10 w-10 items-center justify-center bg-polygon bg-cover bg-center bg-no-repeat">
                                {value}
                            </div>
                            <div className="grow">
                                <div className="mb-1 first-letter:uppercase">{label}</div>
                                <div className="max-w-34 h-1 w-full rounded bg-base-300">
                                    <div
                                        style={{ width: `${(value / maxLength) * 100}%` }}
                                        className="h-full rounded bg-cta"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full">Current NFT doesn’t have any skills</div>
                )}
            </div>
        </NftAccordionWrapper>
    )
}

export default Skills
