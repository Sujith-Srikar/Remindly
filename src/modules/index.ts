import { waterRemainder } from "./water/waterRemainder";
import { type RemainderConfig } from "../core/types"; 

export const remainderModules: RemainderConfig[] = [waterRemainder];

export const getRemainderById = ( id: string ) : RemainderConfig | undefined => {
    return remainderModules.find((module) => module.id === id)
} 