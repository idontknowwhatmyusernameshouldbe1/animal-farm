"use client";

import Link from "next/link";
import HomeGallery from "@/components/HomeGallery";
import { useLanguage } from "@/components/LanguageProvider";

export default function HomePageContent() {
  const { t } = useLanguage();

  return (
    <>
      <section className="hero">
        <h1 className="hero-brand">{t.brand}</h1>
        <p className="hero-copy">{t.heroCopy}</p>
        <div className="hero-actions">
          <Link href="/pets/new" className="btn btn-primary">
            {t.addPet}
          </Link>
        </div>
      </section>

      <HomeGallery />
    </>
  );
}
