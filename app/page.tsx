const roles = [
  ["2022—24", "PwC UK", "Manager, Ethical Hacking"],
  ["2020—22", "Synack Red Team", "Red Team Member"],
  ["2022", "EY", "Senior Consultant, Cyber Security"],
];

const credentials = [
  ["GCPN", "https://www.credly.com/badges/3a37553a-294a-4b3e-a30d-bd202dbaf764"],
  ["OSEP", "https://www.credly.com/badges/7098119f-fa04-4147-b8be-e01ef3ea6611"],
  ["OSCP", "https://www.credly.com/badges/a39ab616-aef7-4107-ace5-fb98ff190a1c"],
  ["OSWP", "https://www.credly.com/badges/a6fa1744-53e9-48d5-8f9c-cd7f4ec57981"],
  ["CREST CRT", null],
  ["CRTO", null],
  ["eWPTX", null],
] as const;

export default function Home() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://moaaztaha.com/#moaaz-taha",
    name: "Moaaz Taha",
    alternateName: ["Moaaz Mohamed Ahmed Taha", "0xStorm", "0xStorm0", "Moaaz_Taha", "MoaazTaha", "n0lsec"],
    url: "https://moaaztaha.com/",
    email: ["mailto:moaaz@moaaztaha.com", "mailto:MoaazTaha@gmail.com"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "professional enquiries",
      email: "moaaz@moaaztaha.com",
    },
    jobTitle: "Senior Cyber Security Engineer, Threat Simulation",
    homeLocation: { "@type": "Place", name: "London, United Kingdom" },
    sameAs: [
      "https://www.linkedin.com/in/moaaz-taha/",
      "https://bugcrowd.com/MoaazTaha",
      "https://bughunter.withgoogle.com/profile/ee24e782-6d7f-49c1-a619-6cc8cc016a8f",
      "https://www.credly.com/users/moaaz-taha/badges/credly",
      "https://x.com/0xStorm0",
    ],
    knowsAbout: ["Red teaming", "Adversary emulation", "Threat simulation", "Penetration testing", "Vulnerability research"],
    subjectOf: [
      {
        "@type": "CreativeWork",
        name: "SolarWinds Web Help Desk security advisory for CVE-2021-32076",
        url: "https://www.solarwinds.com/trust-center/security-advisories/cve-2021-32076",
      },
      {
        "@type": "CreativeWork",
        name: "Bugcrowd P1 Warriors for Q3 2020",
        url: "https://www.bugcrowd.com/blog/announcing-our-p1-warriors-for-q3-2020/",
      },
      {
        "@type": "CreativeWork",
        name: "Esri responsible-disclosure acknowledgement",
        url: "https://trust.arcgis.com/en/security-concern/",
      },
    ],
  };

  const profilePageData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://moaaztaha.com/#profile-page",
    url: "https://moaaztaha.com/",
    name: "Moaaz Taha — Red Team Operator and Security Researcher",
    dateCreated: "2026-08-17",
    dateModified: "2026-08-18",
    mainEntity: person,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageData) }} />
      <header className="siteHeader">
        <a className="siteName" href="/">Moaaz Taha</a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="/research">Research</a>
          <a href="/about">About</a>
        </nav>
      </header>

      <main className="page" id="main-content">
        <section className="introduction" aria-labelledby="intro-title">
          <p className="kicker">Security engineer · London</p>
          <h1 id="intro-title">Hello, I’m Moaaz.</h1>
          <div className="introCopy">
            <p>
              I’m a senior security engineer specialising in full-scope red team
              operations, adversary emulation and threat simulation. I trace the
              routes a determined attacker could use through hybrid environments,
              then turn that work into practical improvements for defenders.
            </p>
            <p>
              Over the past decade I’ve led red and purple team engagements,
              developed offensive tooling, and worked alongside defenders to
              turn attack paths into stronger detections and concrete remediation.
              I’m particularly interested in routes that do not depend on phishing.
            </p>
          </div>
          <p className="contactLine">
            <a href="mailto:moaaz@moaaztaha.com">moaaz@moaaztaha.com</a>
            <span aria-hidden="true">·</span>
            <a href="https://www.linkedin.com/in/moaaz-taha/" rel="me">LinkedIn</a>
            <span aria-hidden="true">·</span>
            <a href="/about">About &amp; contact</a>
          </p>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <div className="sectionHeading"><p>01</p><h2 id="work-title">The work</h2></div>
          <div className="sectionBody">
            <div className="practiceList">
              <article className="practice">
                <h3>Red team operations</h3>
                <p>Intelligence-driven exercises that follow complete attack chains across identity, endpoints, applications and hybrid infrastructure, then carry the useful lessons into detection and response.</p>
              </article>
              <article className="practice">
                <h3>Adversary emulation</h3>
                <p>Objective-led work grounded in APT tradecraft and MITRE ATT&amp;CK, including payload adaptation, EDR-aware execution and routes that do not assume phishing will work.</p>
              </article>
              <article className="practice">
                <h3>Offensive engineering</h3>
                <p>Building and operationalising tooling and infrastructure for repeatable red and purple team work, with clear remediation rather than a pile of findings.</p>
              </article>
              <article className="practice">
                <h3>Vulnerability research</h3>
                <p>Business-logic, access-control and injection findings, with five CVE records and acknowledgements from public security programmes.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="public-work" aria-labelledby="public-work-title">
          <div className="sectionHeading"><p>02</p><h2 id="public-work-title">Selected public work</h2></div>
          <div className="sectionBody">
            <article className="selectedWork">
              <p className="recordMeta">SolarWinds Web Help Desk · 2021</p>
              <h3>A trust decision hidden in a referrer header</h3>
              <p>
                Web Help Desk used the HTTP referrer as part of an access restriction
                around its setup flow. Spoofing that value exposed an administrator
                creation path outside the expected network range. SolarWinds credited
                the report and fixed the issue in version 12.7.6.
              </p>
              <p className="recordLinks">
                <a href="https://www.solarwinds.com/trust-center/security-advisories/cve-2021-32076">Vendor advisory</a>
                <span aria-hidden="true"> · </span>
                <a href="https://nvd.nist.gov/vuln/detail/CVE-2021-32076">CVE-2021-32076</a>
              </p>
            </article>
            <div className="workNotes">
              <article className="workNote">
                <h3>Critical finding recognition</h3>
                <p>Bugcrowd included me in its Q3 2020 P1 Warriors list. Google and Esri also record acknowledgements through their public security programmes.</p>
                <p className="recordLinks"><a href="https://www.bugcrowd.com/blog/announcing-our-p1-warriors-for-q3-2020/">Bugcrowd</a><span aria-hidden="true"> · </span><a href="https://bughunter.withgoogle.com/profile/ee24e782-6d7f-49c1-a619-6cc8cc016a8f">Google Bug Hunters</a><span aria-hidden="true"> · </span><a href="https://trust.arcgis.com/en/security-concern/">Esri</a></p>
              </article>
              <article className="workNote">
                <h3>Research archive</h3>
                <p>Five public vulnerability records are collected with their vendor, NVD and Exploit-DB references.</p>
                <p className="recordLinks"><a href="/research">Read the source-linked archive</a></p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="background" aria-labelledby="background-title">
          <div className="sectionHeading"><p>03</p><h2 id="background-title">Background</h2></div>
          <div className="sectionBody">
            <h3>Earlier roles</h3>
            <div className="roleList">
              {roles.map(([period, company, role]) => (
                <div className="role" key={`${company}-${period}`}>
                  <span>{period}</span><div><strong>{company}</strong><p>{role}</p></div>
                </div>
              ))}
            </div>
            <div className="credentials">
              <h3>Selected credentials</h3>
              <p className="credentialLinks">
                {credentials.map(([label, url], index) => (
                  <span key={label}>
                    {index > 0 && <span aria-hidden="true"> · </span>}
                    {url ? <a href={url}>{label}</a> : label}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>Moaaz Taha · London · Last reviewed August 2026</p>
        <p><a href="/about">About &amp; contact</a><span aria-hidden="true"> · </span><a href="/moaaz-taha.vcf">vCard</a><span aria-hidden="true"> · </span><a href="/.well-known/security.txt">security.txt</a></p>
      </footer>
    </>
  );
}
