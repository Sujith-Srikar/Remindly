import { alarmScheduler } from "../scheduler/alarmScheduler";
import { notificationService } from "../notification/notificationService";
import { remainderPlugins, getRemainderById } from "../../plugins";
import type { RemainderSettings, ParseAlarmName } from "../../core/types";
import { REMAINDER, RETRY } from "../../utils/constant";

export const remainderEngine = {
  async init() {
    const storage = await chrome.storage.local.get(null);

    for (const module of remainderPlugins) {
      const settings = storage[module.id] as RemainderSettings | undefined;

      if (!settings) continue;

      if (settings.enabled) {
        const interval = settings.interval ?? module.defaultInterval;
        await alarmScheduler.scheduleAlarm(module.id, interval);
      }
    }
  },

  async startRemainder(remainderId: string, settings: RemainderSettings) {
    if (!settings.enabled) return;

    const module = getRemainderById(remainderId);

    if (!module) return;
    const interval = settings.interval ?? module.defaultInterval;
    await alarmScheduler.scheduleAlarm(remainderId, interval);
  },

  async stopRemainder(remainderId: string) {
    await alarmScheduler.clearAlarm(remainderId);
  },

  handleAlarm(alarm: chrome.alarms.Alarm) {
    const parsed = parseAlarmName(alarm.name);

    if (!parsed) return;

    const remainderId = parsed.remainderId;
    const module = getRemainderById(remainderId);

    if (!module) return;
    notificationService.showRemainderNotification({
      ...module,
      id: alarm.name,
    });
  },

  async handleIgnored(notificationId: string) {
    const parsed = parseAlarmName(notificationId);
    if (!parsed) return;
    await this.stopRemainder(parsed.remainderId);
    const module = getRemainderById(parsed.remainderId);
    if (!module) return;

    if (parsed.type === REMAINDER) {
      const delay = module.retrySchedule[0];
      await alarmScheduler.scheduleRetryAlarm(parsed.remainderId, 1, delay);
    }

    if (parsed.type === RETRY) {
      const currentStage = parsed.stage ?? 1;
      const nextStage = currentStage + 1;

      if (nextStage > module.retrySchedule.length) {
        notificationService.showGoodByeNotification(module);
        await this.stopRemainder(parsed.remainderId);
        return;
      }

      const delay = module.retrySchedule[nextStage - 1];
      await alarmScheduler.scheduleRetryAlarm(
        parsed.remainderId,
        nextStage,
        delay,
      );
    }
  },
};

function parseAlarmName(name: string): ParseAlarmName | null {
  const parts = name.split(":");

  if (parts[0] === REMAINDER) {
    return {
      type: REMAINDER,
      remainderId: parts[1],
    };
  }

  if (parts[0] === RETRY) {
    return {
      type: RETRY,
      remainderId: parts[1],
      stage: Number(parts[2]),
    };
  }

  return null;
}
