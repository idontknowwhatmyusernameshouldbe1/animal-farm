import { Suspense } from "react";
import PetDetail from "@/components/PetDetail";

export const metadata = {
  title: "Pet · Animal Farm",
};

export default function PetViewPage() {
  return (
    <Suspense fallback={<p className="page-sub">Loading…</p>}>
      <PetDetail />
    </Suspense>
  );
}
