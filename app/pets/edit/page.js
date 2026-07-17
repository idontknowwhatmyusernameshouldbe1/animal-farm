import { Suspense } from "react";
import PetEdit from "@/components/PetEdit";

export const metadata = {
  title: "Edit pet · Animal Farm",
};

export default function PetEditPage() {
  return (
    <Suspense fallback={<p className="page-sub">Loading…</p>}>
      <PetEdit />
    </Suspense>
  );
}
