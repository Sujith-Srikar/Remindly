import { writable } from "svelte/store";

export type ThemeMode = "light" | "dark" ;

const systemTheme: ThemeMode = typeof window !== undefined ? window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light" : "dark";
export const themeMode = writable<ThemeMode>(systemTheme);

themeMode.subscribe((mode) => {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(mode);
})

export const activeReminderId = writable<string | null>(null);

export function toggleReminderCard(id: string) {
  activeReminderId.update((current) => (current === id ? null : id));
}