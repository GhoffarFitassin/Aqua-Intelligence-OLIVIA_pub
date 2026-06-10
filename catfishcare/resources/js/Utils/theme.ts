import type { ThemeSetting } from "@/Types";

export const getInitialThemeSetting = (): ThemeSetting => {
    const storedSetting = localStorage.getItem("themeSetting");
    const storedTheme = localStorage.getItem("theme");

    if (
        storedSetting === "light" ||
        storedSetting === "dark" ||
        storedSetting === "system"
    ) {
        return storedSetting;
    }

    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    return "system";
};
