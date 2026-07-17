import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { getDb } from "./db";
import { ensureDataDirs } from "./paths";

export function listPets() {
  return getDb()
    .prepare("SELECT * FROM pets ORDER BY datetime(createdAt) DESC")
    .all();
}

export function getPet(id) {
  return getDb().prepare("SELECT * FROM pets WHERE id = ?").get(id) ?? null;
}

export async function createPet({ name, description, file }) {
  const { uploadsDir } = ensureDataDirs();

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${randomUUID()}.webp`;
  const absolutePath = path.join(uploadsDir, filename);

  await sharp(buffer)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(absolutePath);

  const imagePath = filename;
  const result = getDb()
    .prepare(
      "INSERT INTO pets (name, description, imagePath) VALUES (?, ?, ?)"
    )
    .run(name.trim(), (description || "").trim(), imagePath);

  return getPet(result.lastInsertRowid);
}

export async function updatePet(id, { name, description, file }) {
  const existing = getPet(id);
  if (!existing) return null;

  let imagePath = existing.imagePath;

  if (file && file.size > 0) {
    const { uploadsDir } = ensureDataDirs();
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${randomUUID()}.webp`;
    const absolutePath = path.join(uploadsDir, filename);

    await sharp(buffer)
      .rotate()
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82 })
      .toFile(absolutePath);

    const oldPath = path.join(uploadsDir, existing.imagePath);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    imagePath = filename;
  }

  getDb()
    .prepare(
      "UPDATE pets SET name = ?, description = ?, imagePath = ? WHERE id = ?"
    )
    .run(name.trim(), (description || "").trim(), imagePath, id);

  return getPet(id);
}

export function deletePet(id) {
  const existing = getPet(id);
  if (!existing) return false;

  const { uploadsDir } = ensureDataDirs();

  getDb().prepare("DELETE FROM pets WHERE id = ?").run(id);

  const oldPath = path.join(uploadsDir, existing.imagePath);
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
  }

  return true;
}

export function resolveUploadPath(filename) {
  const { uploadsDir } = ensureDataDirs();
  const safeName = path.basename(filename);
  const root = path.resolve(uploadsDir);
  const absolutePath = path.resolve(uploadsDir, safeName);
  if (!absolutePath.startsWith(root + path.sep) && absolutePath !== root) {
    return null;
  }
  if (!fs.existsSync(absolutePath)) {
    return null;
  }
  return absolutePath;
}
