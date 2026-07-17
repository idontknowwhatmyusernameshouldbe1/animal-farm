import { NextResponse } from "next/server";
import { deletePet, getPet, updatePet } from "@/lib/pets";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  const { id } = await params;
  const pet = getPet(Number(id));
  if (!pet) {
    return NextResponse.json({ error: "Pet not found." }, { status: 404 });
  }
  return NextResponse.json(pet);
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description") || "";
    const file = formData.get("photo");

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (file && typeof file !== "string" && file.size > 0) {
      if (!file.type?.startsWith("image/")) {
        return NextResponse.json(
          { error: "File must be an image." },
          { status: 400 }
        );
      }
    }

    const pet = await updatePet(Number(id), {
      name,
      description: String(description),
      file: file && typeof file !== "string" && file.size > 0 ? file : null,
    });

    if (!pet) {
      return NextResponse.json({ error: "Pet not found." }, { status: 404 });
    }

    return NextResponse.json(pet);
  } catch (error) {
    console.error("Failed to update pet:", error);
    return NextResponse.json(
      { error: "Could not update pet." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const deleted = deletePet(Number(id));
  if (!deleted) {
    return NextResponse.json({ error: "Pet not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
