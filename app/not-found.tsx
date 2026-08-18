import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found — Moaaz Taha",
  description: "The requested page does not exist on moaaztaha.com.",
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    title: "Page not found — Moaaz Taha",
    description: "The requested page does not exist on moaaztaha.com.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Page not found — Moaaz Taha",
    description: "The requested page does not exist on moaaztaha.com.",
    images: [],
  },
};

export default function NotFound() {
  return (
    <main className="page interiorPage notFoundPage" id="main-content">
      <p className="kicker">404</p>
      <h1>Page not found</h1>
      <p className="pageIntro">
        That address does not exist. The homepage, research archive and about
        page are still available.
      </p>
      <p className="notFoundLinks">
        <a href="/">Home</a>
        <span aria-hidden="true"> · </span>
        <a href="/research">Research</a>
        <span aria-hidden="true"> · </span>
        <a href="/about">About</a>
      </p>
    </main>
  );
}
