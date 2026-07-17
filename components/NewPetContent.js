"use client";

import Link from "next/link";
import PetForm from "@/components/PetForm";
import { useLanguage } from "@/components/LanguageProvider";

export default function NewPetContent() {
  const { t } = useLanguage();

  return (
    <>
      <Link href="/" className="back-link">
        {t.backToFarm}
      </Link>
      <h1 className="page-title">{t.addPetTitle}</h1>
      <p className="page-sub">{t.addPetSub}</p>
      <PetForm mode="create" />
    </>
  );
}
