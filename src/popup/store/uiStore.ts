import { writable } from "svelte/store";

export type ThemeMode = "light" | "dark" | "system";

export const themeMode = writable<ThemeMode>("system");

export const activeReminderId = writable<string | null>(null);

export function toggleReminderCard(id: string) {
  activeReminderId.update((current) => (current === id ? null : id));
}