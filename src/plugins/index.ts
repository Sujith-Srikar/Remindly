import { waterRemainder } from "./water/waterRemainder";
import { type RemainderConfig } from "../core/types"; 

export const remainderPlugins: RemainderConfig[] = [waterRemainder, {id:" kljdaklf", title: "hello", "message": "bye", defaultInterval: 30, retrySchedule: [10]}];

export const getRemainderById = ( id: string ) : RemainderConfig | undefined => {
    return remainderPlugins.find((plugin) => plugin.id === id)
} 