export const alarmScheduler = {
  async scheduleAlarm(remainderId: string, interval: number) {
    await chrome.alarms.create(remainderId, { periodInMinutes: interval });
    const alarm = await chrome.alarms.get(remainderId);
    console.log("Alarm:", alarm);
  },

  async clearAlarm(remainderId: string) {
    const wasCleared = await chrome.alarms.clear(remainderId);
    console.log("Alarm Was Cleared", wasCleared);
  },
};
