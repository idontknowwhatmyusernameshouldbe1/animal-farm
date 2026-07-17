import { Suspense } from "react";
import LoadingText from "@/components/LoadingText";
import PetDetail from "@/components/PetDetail";

export const metadata = {
  title: "Pet · Animal Farm",
};

export default function PetViewPage() {
  return (
    <Suspense fallback={<LoadingText />}>
      <PetDetail />
    </Suspense>
  );
}
