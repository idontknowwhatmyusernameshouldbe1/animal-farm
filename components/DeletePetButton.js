"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { deletePet } from "@/lib/pets";

export default function DeletePetButton({ petId, petName, onDeleted }) {
  const { t } = useLanguage();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    const ok = window.confirm(t.deleteConfirm(petName));
    if (!ok) return;

    setBusy(true);
    try {
      const deleted = await deletePet(petId);
      if (!deleted) {
        setBusy(false);
        window.alert(t.deleteFailed);
        return;
      }
      onDeleted?.();
    } catch {
      setBusy(false);
      window.alert(t.deleteFailed);
    }
  }

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={onDelete}
      disabled={busy}
    >
      {busy ? t.removing : t.delete}
    </button>
  );
}
