import Database from "better-sqlite3";
import { ensureDataDirs, dbPath } from "./paths";

let db;

export function getDb() {
  if (db) return db;

  ensureDataDirs();
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      imagePath TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  return db;
}
