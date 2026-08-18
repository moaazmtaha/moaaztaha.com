import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Moaaz Taha",
  description: "The work, interests and selected milestones of security engineer Moaaz Taha.",
  alternates: { canonical: "/about" },
  openGraph: { type: "profile", url: "/about", title: "About Moaaz Taha", description: "The work and interests of security engineer Moaaz Taha.", images: [{ url: "/og-card.png", width: 1200, height: 630, alt: "Moaaz Taha — security engineer and red team operator" }] },
  twitter: { card: "summary_large_image", title: "About Moaaz Taha", description: "The work and interests of security engineer Moaaz Taha.", images: ["/og-card.png"] },
};

export default function AboutPage() {
  return (
    <main className="page interiorPage aboutPage" id="main-content">
      <a className="backLink" href="/">← Back to moaaztaha.com</a>
      <h1>About</h1>
      <p className="pageIntro">
        I’m a London-based security engineer who has spent more than a decade
        finding the paths between a plausible foothold and the systems that
        matter. My work spans red team operations, adversary emulation, threat
        simulation and vulnerability research.
      </p>

      <section className="aboutBlock">
        <h2>The problems I like working on</h2>
        <p>
          The most useful exercises rarely stay inside one technology. An
          identity weakness becomes an endpoint problem; an endpoint foothold
          opens a route into an application or cloud control plane. I like
          following that chain far enough to show what actually matters, then
          working backwards with defenders on the detections and controls that
          would have broken it.
        </p>
        <p>
          That has meant adapting payloads around modern endpoint controls,
          automating infrastructure for repeatable exercises, modelling APT
          tradecraft with MITRE ATT&amp;CK, and looking for initial-access routes
          beyond the usual phishing scenario. The goal is a better security
          decision, not a longer findings list.
        </p>
      </section>

      <section className="aboutBlock">
        <h2>Selected milestones</h2>
        <ul className="sourceList">
          <li>Five published CVE records, including a <a href="https://www.solarwinds.com/trust-center/security-advisories/cve-2021-32076">SolarWinds Web Help Desk access-control bypass</a>.</li>
          <li>Named in <a href="https://www.bugcrowd.com/blog/announcing-our-p1-warriors-for-q3-2020/">Bugcrowd’s Q3 2020 P1 Warriors</a> for a critical submission.</li>
          <li>Acknowledged through the <a href="https://bughunter.withgoogle.com/profile/ee24e782-6d7f-49c1-a619-6cc8cc016a8f" rel="me">Google Bug Hunters programme</a>.</li>
          <li>Credentials including GCPN, OSEP, OSCP and OSWP, with <a href="https://www.credly.com/users/moaaz-taha/badges/credly" rel="me">issuer-hosted records</a>.</li>
        </ul>
        <p className="recordLinks"><a href="/research">Read the source-linked research archive</a></p>
      </section>

      <section className="aboutBlock">
        <h2>Contact</h2>
        <p><a href="mailto:moaaz@moaaztaha.com">moaaz@moaaztaha.com</a></p>
        <p className="recordLinks"><a href="https://www.linkedin.com/in/moaaz-taha/" rel="me">LinkedIn</a><span aria-hidden="true"> · </span><a href="/moaaz-taha.vcf">Download vCard</a></p>
      </section>
    </main>
  );
}
