"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function PetForm({
  mode = "create",
  petId,
  initialName = "",
  initialDescription = "",
  initialImageUrl = "",
}) {
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
      const formData = new FormData();
      formData.set("name", name);
      formData.set("description", description);

      const file = fileRef.current?.files?.[0];
      if (file) {
        formData.set("photo", file);
      }

      if (mode === "create" && !file) {
        setError("Please choose a photo.");
        setSaving(false);
        return;
      }

      const url = mode === "create" ? "/api/pets" : `/api/pets/${petId}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, { method, body: formData });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        setSaving(false);
        return;
      }

      router.push(`/pets/${data.id}`);
      router.refresh();
    } catch {
      setError("Could not save. Check your connection and try again.");
      setSaving(false);
    }
  }

  return (
    <form className="form-panel form-stack" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="photo">Photo</label>
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
            <img src={preview} alt="Preview" className="photo-preview" />
          ) : (
            <div className="photo-picker-hint">
              <strong>Tap to add a photo</strong>
              Take a picture or choose from your library
            </div>
          )}
        </label>
      </div>

      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Charlie"
          required
          maxLength={80}
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A little about this friend…"
          maxLength={2000}
        />
      </div>

      {error ? <p className="form-error">{error}</p> : null}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving…" : mode === "create" ? "Save pet" : "Save changes"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          disabled={saving}
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
