"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LoadingText() {
  const { t } = useLanguage();
  return <p className="page-sub">{t.loading}</p>;
}
