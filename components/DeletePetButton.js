"use client";

import { useState } from "react";
import { deletePet } from "@/lib/pets";

export default function DeletePetButton({ petId, petName, onDeleted }) {
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    const ok = window.confirm(
      `Remove ${petName} from Animal Farm? This cannot be undone.`
    );
    if (!ok) return;

    setBusy(true);
    try {
      const deleted = await deletePet(petId);
      if (!deleted) {
        setBusy(false);
        window.alert("Could not delete this pet. Try again.");
        return;
      }
      onDeleted?.();
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
