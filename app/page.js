import Link from "next/link";
import FadeImage from "@/components/FadeImage";
import { listPets } from "@/lib/pets";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const pets = listPets();

  return (
    <>
      <section className="hero">
        <h1 className="hero-brand">Animal Farm</h1>
        <p className="hero-copy">
          A quiet place for your pets — their photos, names, and the little
          stories that make them yours.
        </p>
        <div className="hero-actions">
          <Link href="/pets/new" className="btn btn-primary">
            Add a pet
          </Link>
        </div>
      </section>

      {pets.length === 0 ? (
        <div className="empty-state">
          <p>No animals on the farm yet. Add your first pet to get started.</p>
          <Link href="/pets/new" className="btn btn-primary">
            Add a pet
          </Link>
        </div>
      ) : (
        <section className="gallery" aria-label="Pet gallery">
          {pets.map((pet) => (
            <Link key={pet.id} href={`/pets/${pet.id}`} className="pet-card">
              <FadeImage
                src={`/api/uploads/${pet.imagePath}`}
                alt={pet.name}
                className="pet-card-image"
              />
              <div className="pet-card-body">
                <h2 className="pet-card-name">{pet.name}</h2>
              </div>
            </Link>
          ))}
        </section>
      )}
    </>
  );
}
