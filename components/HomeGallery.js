"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FadeImage from "@/components/FadeImage";
import { listPets, petImageUrl } from "@/lib/pets";

export default function HomeGallery() {
  const [pets, setPets] = useState(null);
  const [urls, setUrls] = useState({});

  useEffect(() => {
    let cancelled = false;
    const created = [];

    listPets()
      .then((items) => {
        if (cancelled) return;
        const nextUrls = {};
        for (const pet of items) {
          const url = petImageUrl(pet);
          created.push(url);
          nextUrls[pet.id] = url;
        }
        setUrls(nextUrls);
        setPets(items);
      })
      .catch(() => {
        if (!cancelled) setPets([]);
      });

    return () => {
      cancelled = true;
      for (const url of created) URL.revokeObjectURL(url);
    };
  }, []);

  if (pets === null) {
    return <p className="page-sub">Loading your farm…</p>;
  }

  if (pets.length === 0) {
    return (
      <div className="empty-state">
        <p>No animals on the farm yet. Add your first pet to get started.</p>
        <Link href="/pets/new" className="btn btn-primary">
          Add a pet
        </Link>
      </div>
    );
  }

  return (
    <section className="gallery" aria-label="Pet gallery">
      {pets.map((pet) => (
        <Link
          key={pet.id}
          href={`/pets/view?id=${encodeURIComponent(pet.id)}`}
          className="pet-card"
        >
          <FadeImage
            src={urls[pet.id]}
            alt={pet.name}
            className="pet-card-image"
          />
          <div className="pet-card-body">
            <h2 className="pet-card-name">{pet.name}</h2>
          </div>
        </Link>
      ))}
    </section>
  );
}
