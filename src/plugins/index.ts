import { waterRemainder } from "./water/waterRemainder";
import { type RemainderConfig } from "../core/types"; 

export const remainderPlugins: RemainderConfig[] = [waterRemainder];

export const getRemainderById = ( id: string ) : RemainderConfig | undefined => {
    return remainderPlugins.find((plugin) => plugin.id === id)
} 