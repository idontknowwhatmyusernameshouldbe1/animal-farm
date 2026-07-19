"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? t.themeToLightAria : t.themeToDarkAria}
    >
      {isDark ? t.themeToLight : t.themeToDark}
    </button>
  );
}
