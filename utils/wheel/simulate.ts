import { WheelCore } from 'common-types/wheel'
import { randomInt } from 'utils/randomInt'
type SpinSimulateResult = {
    index: number
    reward: WheelCore.WheelReward
    amount: number
}

export function simulateSpin(rewards: WheelCore.WheelReward[]): SpinSimulateResult {
    let totalChance = 0
    const chanceMap = new Map<number, { reward: WheelCore.WheelReward; index: number }>()

    rewards.forEach((reward, index) => {
        if (reward.reward.type === 'VIRTUAL') return

        const condition = reward.drop.conditions.find(i => i.conditionType === 'RANDOM')

        if (!condition) return
        const chance = condition.conditionProperties.chance

        totalChance += chance
        chanceMap.set(totalChance, { reward, index })
    })
    for (const reward of rewards) {
    }

    const random = Math.random() * totalChance

    for (const [topEdge, item] of Array.from(chanceMap.entries())) {
        if (random <= topEdge) {
            const range = item.reward.drop.limit.maxQuantityDrop

            const amount = randomInt(range.properties.min, range.properties.max + 1)

            return { ...item, amount }
        }
    }

    throw new Error('Failed to find reward with required chance')
}
