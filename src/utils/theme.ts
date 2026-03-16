import { type ThemeMode } from "../popup/store/uiStore";

export const applyTheme = (mode: ThemeMode) => {
  let theme = mode;
  if (mode === "system") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
};
