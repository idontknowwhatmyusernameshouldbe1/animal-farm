import Link from "next/link";
import HomeGallery from "@/components/HomeGallery";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1 className="hero-brand">Animal Farm</h1>
        <p className="hero-copy">
          Photos, names, and the small stories that make them yours.
        </p>
        <div className="hero-actions">
          <Link href="/pets/new" className="btn btn-primary">
            Add a pet
          </Link>
        </div>
      </section>

      <HomeGallery />
    </>
  );
}
