"use client";

import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";

const WINDOWS_APP_URL =
  "https://idontknowwhatmyusernameshouldbe1.github.io/animal-farm-windows/";

function Shell({ children }) {
  const { t } = useLanguage();

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link href="/" className="brand-mark">
          {t.brand}
        </Link>
        <div className="header-actions">
          <a
            href={WINDOWS_APP_URL}
            className="header-link"
            aria-label={t.windowsAppAria}
          >
            {t.windowsApp}
          </a>
          <LanguageToggle />
        </div>
      </header>
      <main className="site-main">{children}</main>
    </div>
  );
}

export default function AppShell({ children }) {
  return (
    <LanguageProvider>
      <Shell>{children}</Shell>
    </LanguageProvider>
  );
}
