import {
  idbDeletePet,
  idbGetAllPets,
  idbGetPet,
  idbPutPet,
} from "./idb";

async function fileToImageBitmap(file) {
  if (typeof createImageBitmap === "function") {
    return createImageBitmap(file);
  }

  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Could not read image."));
      img.src = url;
    });
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function compressImage(file, maxSide = 1600, quality = 0.82) {
  const source = await fileToImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(source.width, source.height));
  const width = Math.max(1, Math.round(source.width * scale));
  const height = Math.max(1, Math.round(source.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not process image.");
  }
  ctx.drawImage(source, 0, 0, width, height);
  if (typeof source.close === "function") {
    source.close();
  }

  const blob = await new Promise((resolve) => {
    canvas.toBlob(
      (result) => resolve(result),
      "image/webp",
      quality
    );
  });

  if (blob) return blob;

  const jpegBlob = await new Promise((resolve) => {
    canvas.toBlob((result) => resolve(result), "image/jpeg", quality);
  });

  if (!jpegBlob) {
    throw new Error("Could not compress image.");
  }
  return jpegBlob;
}

export function petImageUrl(pet) {
  if (!pet?.imageBlob) return "";
  return URL.createObjectURL(pet.imageBlob);
}

export async function listPets() {
  return idbGetAllPets();
}

export async function getPet(id) {
  if (!id) return null;
  return idbGetPet(String(id));
}

export async function createPet({ name, description, file }) {
  if (!file) {
    throw new Error("A photo is required.");
  }

  const imageBlob = await compressImage(file);
  const pet = {
    id: crypto.randomUUID(),
    name: name.trim(),
    description: (description || "").trim(),
    imageBlob,
    createdAt: new Date().toISOString(),
  };

  await idbPutPet(pet);
  return pet;
}

export async function updatePet(id, { name, description, file }) {
  const existing = await getPet(id);
  if (!existing) return null;

  let imageBlob = existing.imageBlob;
  if (file && file.size > 0) {
    imageBlob = await compressImage(file);
  }

  const pet = {
    ...existing,
    name: name.trim(),
    description: (description || "").trim(),
    imageBlob,
  };

  await idbPutPet(pet);
  return pet;
}

export async function deletePet(id) {
  const existing = await getPet(id);
  if (!existing) return false;
  await idbDeletePet(String(id));
  return true;
}
