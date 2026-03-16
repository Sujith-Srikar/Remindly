import { writable } from "svelte/store";
import { type RemainderConfig } from "../../core/types";

export const remaindersPlugins = writable<RemainderConfig[]>([]);