import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://moaaztaha.com"),
  title: "Moaaz Taha — Red Team Operator and Security Researcher",
  description: "Red team operations, adversary emulation, threat simulation and public security research by Moaaz Taha.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: "Moaaz Taha — Red Team Operator and Security Researcher",
    description: "Red team work, selected research and professional background for Moaaz Taha.",
    images: [{ url: "/og-card.png", width: 1200, height: 630, alt: "Moaaz Taha — security engineer and red team operator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moaaz Taha — Red Team Operator and Security Researcher",
    description: "Red team work, selected research and professional background for Moaaz Taha.",
    images: ["/og-card.png"],
  },
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skipLink" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
