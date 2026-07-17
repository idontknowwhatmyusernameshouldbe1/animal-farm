import { Suspense } from "react";
import LoadingText from "@/components/LoadingText";
import PetEdit from "@/components/PetEdit";

export const metadata = {
  title: "Edit pet · Animal Farm",
};

export default function PetEditPage() {
  return (
    <Suspense fallback={<LoadingText />}>
      <PetEdit />
    </Suspense>
  );
}
