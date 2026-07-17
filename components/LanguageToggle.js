"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const { t, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggleLang}
      aria-label={t.langToggleAria}
    >
      {t.langToggle}
    </button>
  );
}
