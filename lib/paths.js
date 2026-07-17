import fs from "fs";
import path from "path";

export function getPaths() {
  const dataDir = process.env.DATA_DIR
    ? path.resolve(process.env.DATA_DIR)
    : path.join(/*turbopackIgnore: true*/ process.cwd(), "data");
  const uploadsDir = path.join(dataDir, "uploads");
  const dbPath = path.join(dataDir, "animal-farm.db");
  return { dataDir, uploadsDir, dbPath };
}

export function ensureDataDirs() {
  const paths = getPaths();
  fs.mkdirSync(paths.uploadsDir, { recursive: true });
  return paths;
}
