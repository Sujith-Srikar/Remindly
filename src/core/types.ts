import { REMAINDER, RETRY } from "../utils/constant";

export interface RemainderSettings {
    enabled: boolean;
    interval: number;
}

export interface RemainderConfig {
    id: string;
    title: string;
    defaultInterval: number;
    message: string;
    retrySchedule: number[];
    iconUrl?: string;
    buttonLabels?: {
        accept: string;
        dismiss: string;
    }
}

type RemainderType = typeof REMAINDER | typeof RETRY

export interface ParseAlarmName {
    type: RemainderType;
    remainderId: string;
    stage?: number
}