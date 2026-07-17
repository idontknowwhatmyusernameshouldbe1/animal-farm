import Link from "next/link";
import { notFound } from "next/navigation";
import DeletePetButton from "@/components/DeletePetButton";
import FadeImage from "@/components/FadeImage";
import { getPet } from "@/lib/pets";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const pet = getPet(Number(id));
  if (!pet) return { title: "Pet not found · Animal Farm" };
  return { title: `${pet.name} · Animal Farm` };
}

export default async function PetDetailPage({ params }) {
  const { id } = await params;
  const pet = getPet(Number(id));
  if (!pet) notFound();

  return (
    <>
      <Link href="/" className="back-link">
        ← Back to farm
      </Link>
      <article className="detail">
        <div className="detail-image-wrap">
          <FadeImage
            src={`/api/uploads/${pet.imagePath}`}
            alt={pet.name}
            className="detail-image"
          />
        </div>
        <div className="detail-body">
          <h1>{pet.name}</h1>
          <p className="detail-description">
            {pet.description?.trim()
              ? pet.description
              : "No description yet."}
          </p>
          <div className="detail-actions">
            <Link href={`/pets/${pet.id}/edit`} className="btn btn-primary">
              Edit
            </Link>
            <DeletePetButton petId={pet.id} petName={pet.name} />
          </div>
        </div>
      </article>
    </>
  );
}
