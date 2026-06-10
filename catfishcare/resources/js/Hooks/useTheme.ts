import { useState, useEffect } from "react";
import type { ThemeSetting, Theme } from "@/Types";
import { getInitialThemeSetting } from "@/Utils/theme";

export const useTheme = () => {
    const [themeSetting, setThemeSetting] = useState<ThemeSetting>(
        getInitialThemeSetting,
    );

    const [theme, setTheme] = useState<Theme>(() => {
        if (themeSetting === "system") {
            return globalThis.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        }
        return themeSetting;
    });

    const changeThemeSetting = (newSetting: ThemeSetting) => {
        setThemeSetting(newSetting);
        localStorage.setItem("themeSetting", newSetting);
    };

    const toggleTheme = () => {
        setThemeSetting(() => {
            const nextSetting = theme === "light" ? "dark" : "light";
            localStorage.setItem("themeSetting", nextSetting);
            return nextSetting;
        });
    };

    useEffect(() => {
        if (themeSetting === "system") {
            const mediaQuery = globalThis.matchMedia(
                "(prefers-color-scheme: dark)",
            );
            const handleChange = (e: MediaQueryListEvent) => {
                setTheme(e.matches ? "dark" : "light");
            };

            setTheme(mediaQuery.matches ? "dark" : "light");
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        } else {
            setTheme(themeSetting);
        }
    }, [themeSetting]);

    useEffect(() => {
        document.body.className =
            theme === "light" ? "light-theme" : "dark-theme";
    }, [theme]);

    return {
        theme,
        themeSetting,
        changeThemeSetting,
        toggleTheme,
    };
};
