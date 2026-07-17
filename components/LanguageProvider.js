"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LANG_STORAGE_KEY, translations } from "@/lib/i18n";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (stored === "en" || stored === "sv") {
        setLang(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((current) => (current === "en" ? "sv" : "en"));
  }, []);

  const value = useMemo(
    () => ({
      lang,
      t: translations[lang],
      toggleLang,
    }),
    [lang, toggleLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
