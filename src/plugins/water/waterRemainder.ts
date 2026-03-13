import { WATER_REMAINDER } from "../../utils/constant"
import { type RemainderConfig } from "../../core/types"

export const waterRemainder : RemainderConfig = {
    id: WATER_REMAINDER,
    title: "Drink Water",
    defaultInterval: 30,
    message: "Time to drink water",
    retrySchedule: [3, 4, 5]
}