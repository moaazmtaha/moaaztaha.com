import type { Metadata } from "next";
import { researchRecords } from "./data";

export const metadata: Metadata = {
  title: "Vulnerability research by Moaaz Taha",
  description:
    "A source-linked record of five CVEs and public vulnerability research by Moaaz Taha, previously published as 0xStorm.",
  alternates: { canonical: "/research" },
  openGraph: {
    type: "article",
    url: "/research",
    title: "Vulnerability research by Moaaz Taha",
    description: "Five CVEs with vendor, NVD and Exploit-DB evidence.",
    images: [{ url: "/research-card.png", width: 1200, height: 630, alt: "Five public CVEs by Moaaz Taha" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vulnerability research by Moaaz Taha",
    description: "Five CVEs with vendor, NVD and Exploit-DB evidence.",
    images: ["/research-card.png"],
  },
};

export default function ResearchPage() {
  const researchPageData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://moaaztaha.com/research#page",
    url: "https://moaaztaha.com/research",
    name: "Vulnerability research by Moaaz Taha",
    description: "Five source-linked CVE records by Moaaz Taha, previously published as 0xStorm.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: researchRecords.length,
      itemListElement: researchRecords.map((record, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          "@id": `https://moaaztaha.com/research#${record.id.toLowerCase()}`,
          name: `${record.id}: ${record.title}`,
          identifier: record.id,
          url: `https://moaaztaha.com/research#${record.id.toLowerCase()}`,
          author: { "@id": "https://moaaztaha.com/#moaaz-taha" },
          sameAs: record.nvd,
          citation: [record.nvd, record.evidence],
        },
      })),
    },
  };

  return (
    <main className="page interiorPage researchPage" id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(researchPageData) }} />
      <a className="backLink" href="/">← Back to moaaztaha.com</a>
      <h1>Public research</h1>
      <p className="pageIntro">
        Five CVE records linked to their original public evidence. This page is
        intentionally a record, not a claim of current exploitability.
      </p>

      <div className="researchRecords">
        {researchRecords.map((record) => (
          <article className="researchRecord" id={record.id.toLowerCase()} key={record.id}>
            <p className="recordMeta">{record.year} · vulnerability record</p>
            <h2>{record.id}</h2>
            <h3>{record.title}</h3>
            <p>{record.summary}</p>
            <p className="creditLine">{record.credit}</p>
            <p className="recordLinks">
              <a href={record.nvd}>NVD record</a>
              <span aria-hidden="true"> · </span>
              <a href={record.evidence}>{record.evidenceLabel}</a>
            </p>
          </article>
        ))}
      </div>

      <section className="researchNote">
        <h2>How the records connect</h2>
        <p>
          SolarWinds names Moaaz Taha in its advisory. The four Exploit-DB
          submissions name the author as “Moaaz Taha (0xStorm)”; the matching
          NVD records cite those submissions as public references.
        </p>
        <p className="notice">
          Product and vulnerability descriptions are short summaries of the
          linked records. The external records remain authoritative.
        </p>
      </section>
    </main>
  );
}
