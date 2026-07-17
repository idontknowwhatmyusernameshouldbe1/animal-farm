"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { createPet, updatePet } from "@/lib/pets";

export default function PetForm({
  mode = "create",
  petId,
  initialName = "",
  initialDescription = "",
  initialImageUrl = "",
}) {
  const { t } = useLanguage();
  const router = useRouter();
  const fileRef = useRef(null);
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [preview, setPreview] = useState(initialImageUrl);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function onFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const file = fileRef.current?.files?.[0] ?? null;

      if (mode === "create" && !file) {
        setError(t.errorChoosePhoto);
        setSaving(false);
        return;
      }

      if (!name.trim()) {
        setError(t.errorNameRequired);
        setSaving(false);
        return;
      }

      const pet =
        mode === "create"
          ? await createPet({ name, description, file })
          : await updatePet(petId, { name, description, file });

      if (!pet) {
        setError(t.errorPetNotFound);
        setSaving(false);
        return;
      }

      router.push(`/pets/view?id=${encodeURIComponent(pet.id)}`);
    } catch {
      setError(t.errorCouldNotSave);
      setSaving(false);
    }
  }

  return (
    <form className="form-panel form-stack" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="photo">{t.photo}</label>
        <label className="photo-picker">
          <input
            id="photo"
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={onFileChange}
            required={mode === "create"}
          />
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt={t.photoPreview} className="photo-preview" />
          ) : (
            <div className="photo-picker-hint">
              <strong>{t.photoHintTitle}</strong>
              {t.photoHintBody}
            </div>
          )}
        </label>
      </div>

      <div className="field">
        <label htmlFor="name">{t.name}</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          required
          maxLength={80}
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="description">{t.description}</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t.descriptionPlaceholder}
          maxLength={2000}
        />
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving
            ? t.saving
            : mode === "create"
              ? t.savePet
              : t.saveChanges}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          disabled={saving}
          onClick={() => router.back()}
        >
          {t.cancel}
        </button>
      </div>
    </form>
  );
}
