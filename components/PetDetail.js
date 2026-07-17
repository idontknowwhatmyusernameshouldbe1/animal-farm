"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DeletePetButton from "@/components/DeletePetButton";
import FadeImage from "@/components/FadeImage";
import { useLanguage } from "@/components/LanguageProvider";
import { getPet, petImageUrl } from "@/lib/pets";

export default function PetDetail() {
  const { t } = useLanguage();
  const router = useRouter();
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
      <Link href="/" className="back-link">
        {t.backToFarm}
      </Link>
      <article className="detail">
        <div className="detail-image-wrap">
          <FadeImage
            src={imageUrl}
            alt={pet.name}
            className="detail-image"
          />
        </div>
        <div className="detail-body">
          <h1>{pet.name}</h1>
          <p className="detail-description">
            {pet.description?.trim() ? pet.description : t.noDescription}
          </p>
          <div className="detail-actions">
            <Link
              href={`/pets/edit?id=${encodeURIComponent(pet.id)}`}
              className="btn btn-primary"
            >
              {t.edit}
            </Link>
            <DeletePetButton
              petId={pet.id}
              petName={pet.name}
              onDeleted={() => router.push("/")}
            />
          </div>
        </div>
      </article>
    </>
  );
}
