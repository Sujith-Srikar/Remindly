import { WATER_REMAINDER } from "../../utils/constant"
import { type RemainderConfig } from "../../core/types"

export const waterRemainder : RemainderConfig = {
    id: WATER_REMAINDER,
    title: "Drink Water",
    defaultInterval: 30,
    message: "POV: your water bottle has trust issues",
    retrySchedule: [3, 4, 5],
    iconUrl: "water.png",
    buttonLabels: {
        accept: "Fine, I'll do it",
        dismiss: "You can't make me!"
    }
}