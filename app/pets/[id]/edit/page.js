import Link from "next/link";
import { notFound } from "next/navigation";
import PetForm from "@/components/PetForm";
import { getPet } from "@/lib/pets";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const pet = getPet(Number(id));
  if (!pet) return { title: "Pet not found · Animal Farm" };
  return { title: `Edit ${pet.name} · Animal Farm` };
}

export default async function EditPetPage({ params }) {
  const { id } = await params;
  const pet = getPet(Number(id));
  if (!pet) notFound();

  return (
    <>
      <Link href={`/pets/${pet.id}`} className="back-link">
        ← Back to {pet.name}
      </Link>
      <h1 className="page-title">Edit {pet.name}</h1>
      <p className="page-sub">Update their photo, name, or description.</p>
      <PetForm
        mode="edit"
        petId={pet.id}
        initialName={pet.name}
        initialDescription={pet.description || ""}
        initialImageUrl={`/api/uploads/${pet.imagePath}`}
      />
    </>
  );
}
