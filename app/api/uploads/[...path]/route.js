import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { resolveUploadPath } from "@/lib/pets";

export const runtime = "nodejs";

const MIME = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
};

export async function GET(_request, { params }) {
  const { path: parts } = await params;
  const filename = Array.isArray(parts) ? parts.join("/") : parts;
  const absolutePath = resolveUploadPath(filename);

  if (!absolutePath) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  const buffer = fs.readFileSync(absolutePath);
  const ext = path.extname(absolutePath).toLowerCase();
  const contentType = MIME[ext] || "application/octet-stream";

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
