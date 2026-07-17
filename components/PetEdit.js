"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PetForm from "@/components/PetForm";
import { useLanguage } from "@/components/LanguageProvider";
import { getPet, petImageUrl } from "@/lib/pets";

export default function PetEdit() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [pet, setPet] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let cancelled = false;
    let url = "";

    if (!id) {
      setPet(null);
      return undefined;
    }

    getPet(id)
      .then((found) => {
        if (cancelled) return;
        if (!found) {
          setPet(null);
          return;
        }
        url = petImageUrl(found);
        setImageUrl(url);
        setPet(found);
      })
      .catch(() => {
        if (!cancelled) setPet(null);
      });

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [id]);

  if (pet === undefined) {
    return <p className="page-sub">{t.loading}</p>;
  }

  if (!pet) {
    return (
      <>
        <Link href="/" className="back-link">
          {t.backToFarm}
        </Link>
        <h1 className="page-title">{t.petNotFound}</h1>
        <p className="page-sub">{t.petNotFoundSub}</p>
      </>
    );
  }

  return (
    <>
      <Link
        href={`/pets/view?id=${encodeURIComponent(pet.id)}`}
        className="back-link"
      >
        {t.backToPet(pet.name)}
      </Link>
      <h1 className="page-title">{t.editTitle(pet.name)}</h1>
      <p className="page-sub">{t.editSub}</p>
      <PetForm
        mode="edit"
        petId={pet.id}
        initialName={pet.name}
        initialDescription={pet.description || ""}
        initialImageUrl={imageUrl}
      />
    </>
  );
}
