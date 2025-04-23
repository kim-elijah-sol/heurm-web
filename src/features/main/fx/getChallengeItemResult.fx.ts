import { ChallengeItemResultType, ChallengeItemType } from "~/entities/main";

export const getChallengeItemResult = (challengeItem: ChallengeItemType): ChallengeItemResultType => {
    if (challengeItem.type === 'complete') {
        if (challengeItem.isCompleted === null) return 'progress'
        if (challengeItem.isCompleted === true) return 'win'
        return 'fail'
    }

    if (challengeItem.count === null) return 'progress'

    if (challengeItem.type === 'over' && challengeItem.count >= challengeItem.targetCount) return 'win'

    if (challengeItem.type === 'under' && challengeItem.count <= challengeItem.targetCount) return 'win'

    return 'fail'
}