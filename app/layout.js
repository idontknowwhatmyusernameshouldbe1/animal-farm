import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Plus_Jakarta_Sans({
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
          </header>
          <main className="site-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
