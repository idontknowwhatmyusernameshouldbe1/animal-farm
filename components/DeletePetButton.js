"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePetButton({ petId, petName }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    const ok = window.confirm(
      `Remove ${petName} from Animal Farm? This cannot be undone.`
    );
    if (!ok) return;

    setBusy(true);
    try {
      const response = await fetch(`/api/pets/${petId}`, { method: "DELETE" });
      if (!response.ok) {
        setBusy(false);
        window.alert("Could not delete this pet. Try again.");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setBusy(false);
      window.alert("Could not delete this pet. Try again.");
    }
  }

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={onDelete}
      disabled={busy}
    >
      {busy ? "Removing…" : "Delete"}
    </button>
  );
}
