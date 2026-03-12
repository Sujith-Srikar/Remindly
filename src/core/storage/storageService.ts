import { type RemainderSettings } from "../types";

const DEFAULT_SETTINGS: RemainderSettings = {
    enabled: false,
    interval: 30
}


const getSettings = async (key: string) : Promise<RemainderSettings> => {
    try {
        const res = await chrome.storage.local.get(key);
        const settings = res[key] as RemainderSettings | undefined;
        return settings ?? DEFAULT_SETTINGS;
    } catch (error) {
        console.warn(`Error while fetching setting for ${key} : ${error}`);
        return DEFAULT_SETTINGS;
    }
}

const saveSettings = async (key: string, settings: RemainderSettings) => {
    try {
        await chrome.storage.local.set({[key]: settings});
    } catch (error) {
        console.warn(`Error while saving setting for ${key} : ${error}`);
    }
}

export {getSettings, saveSettings}