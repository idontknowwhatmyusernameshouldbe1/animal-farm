import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const uploadsDir = path.join(dataDir, "uploads");
const dbPath = path.join(dataDir, "animal-farm.db");

export function ensureDataDirs() {
  fs.mkdirSync(uploadsDir, { recursive: true });
  return { dataDir, uploadsDir, dbPath };
}

export { dataDir, uploadsDir, dbPath };
