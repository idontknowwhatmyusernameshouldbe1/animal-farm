"use client";

import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";

function Shell({ children }) {
  const { t } = useLanguage();

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link href="/" className="brand-mark">
          {t.brand}
        </Link>
        <LanguageToggle />
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
