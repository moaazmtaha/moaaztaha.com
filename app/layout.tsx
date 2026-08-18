import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://moaaztaha.com"),
  title: "Moaaz Taha — Red Team Operator and Security Researcher",
  description: "Red team operations, adversary emulation, threat simulation and public security research by Moaaz Taha.",
  authors: [{ name: "Moaaz Taha", url: "/about" }],
  creator: "Moaaz Taha",
  publisher: "Moaaz Taha",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Moaaz Taha",
    locale: "en_GB",
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
      <head>
        <link rel="me" href="mailto:moaaz@moaaztaha.com" />
        <link rel="me" href="https://github.com/moaazmtaha" />
        <link rel="me" href="https://www.linkedin.com/in/moaaz-taha/" />
        <link rel="me" href="https://www.credly.com/users/moaaz-taha/badges/credly" />
        <link rel="me" href="https://bughunter.withgoogle.com/profile/ee24e782-6d7f-49c1-a619-6cc8cc016a8f" />
        <link rel="me" href="https://x.com/0xStorm0" />
      </head>
      <body>
        <a className="skipLink" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
