import { alarmScheduler } from "../scheduler/alarmScheduler";
import { notificationService } from "../notification/notificationService";
import { remainderModules, getRemainderById } from "../../modules";
import type { RemainderSettings } from "../../core/types";

export const remainderEngine = {

    async init() {
        const storage = await chrome.storage.local.get(null);

        for (const module of remainderModules){
            const settings = storage[module.id] as RemainderSettings | undefined;

            if(!settings) continue;

            if(settings.enabled){
                const interval = settings.interval ?? module.defaultInterval;
                alarmScheduler.scheduleAlarm(module.id, interval);
            }
        }
    },

    startRemainder(remainderId: string , settings: RemainderSettings) {
        if(!settings.enabled) return;

        const module = getRemainderById(remainderId);

        if(!module) return;

        const interval = settings.interval ?? module.defaultInterval;
        alarmScheduler.scheduleAlarm(remainderId, interval);
    },

    stopRemainder (remainderId: string) {
        alarmScheduler.clearAlarm(remainderId);
    },

    handleAlarm (alarm: chrome.alarms.Alarm) {
        const remainderId = alarm.name;
        const module = getRemainderById(remainderId);

        if(!module) return;

        notificationService.showRemainderNotification(module);
    }
}