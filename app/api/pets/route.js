import { NextResponse } from "next/server";
import { createPet, listPets } from "@/lib/pets";

export const runtime = "nodejs";

export async function GET() {
  const pets = listPets();
  return NextResponse.json(pets);
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description") || "";
    const file = formData.get("photo");

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!file || typeof file === "string" || !file.size) {
      return NextResponse.json(
        { error: "A photo is required." },
        { status: 400 }
      );
    }

    if (!file.type?.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image." },
        { status: 400 }
      );
    }

    const pet = await createPet({ name, description: String(description), file });
    return NextResponse.json(pet, { status: 201 });
  } catch (error) {
    console.error("Failed to create pet:", error);
    return NextResponse.json(
      { error: "Could not save pet. Try another image." },
      { status: 500 }
    );
  }
}
