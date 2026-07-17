import Link from "next/link";
import PetForm from "@/components/PetForm";

export const metadata = {
  title: "Add a pet · Animal Farm",
};

export default function NewPetPage() {
  return (
    <>
      <Link href="/" className="back-link">
        ← Back to farm
      </Link>
      <h1 className="page-title">Add a pet</h1>
      <p className="page-sub">
        Upload a photo, give them a name, and write a short description.
      </p>
      <PetForm mode="create" />
    </>
  );
}
