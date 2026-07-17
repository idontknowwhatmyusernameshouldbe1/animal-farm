import { Bricolage_Grotesque, Figtree } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Animal Farm",
  description: "Your personal pet gallery — names, photos, and stories.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="app-shell">
          <header className="site-header">
            <Link href="/" className="brand-mark">
              Animal Farm
            </Link>
            <Link href="/pets/new" className="header-cta">
              Add a pet
            </Link>
          </header>
          <main className="site-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
