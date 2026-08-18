export type ResearchRecord = {
  year: string;
  id: string;
  title: string;
  summary: string;
  nvd: string;
  evidence: string;
  evidenceLabel: string;
  credit: string;
};

export const researchRecords: ResearchRecord[] = [
  {
    year: "2021",
    id: "CVE-2021-32076",
    title: "SolarWinds Web Help Desk — access restriction bypass",
    summary:
      "A referrer-spoofing issue allowed access to the Web Help Desk setup wizard from outside the expected network range. SolarWinds fixed the issue in Web Help Desk 12.7.6.",
    nvd: "https://nvd.nist.gov/vuln/detail/CVE-2021-32076",
    evidence:
      "https://www.solarwinds.com/trust-center/security-advisories/cve-2021-32076",
    evidenceLabel: "SolarWinds advisory",
    credit: "The vendor advisory acknowledges Moaaz Taha by name.",
  },
  {
    year: "2021",
    id: "CVE-2021-34249",
    title: "Online Book Store 1.0 — SQL injection",
    summary:
      "The id parameter in the application URL allowed retrieval of sensitive database information.",
    nvd: "https://nvd.nist.gov/vuln/detail/CVE-2021-34249",
    evidence: "https://www.exploit-db.com/exploits/48775",
    evidenceLabel: "Exploit-DB 48775",
    credit: "The referenced submission credits Moaaz Taha (0xStorm).",
  },
  {
    year: "2020",
    id: "CVE-2020-25905",
    title: "Mobile Shop System 1.0 — SQL injection",
    summary:
      "SQL injection in the email parameter of the user and administrator login routes allowed authentication bypass.",
    nvd: "https://nvd.nist.gov/vuln/detail/CVE-2020-25905",
    evidence: "https://www.exploit-db.com/exploits/48916",
    evidenceLabel: "Exploit-DB 48916",
    credit: "The referenced submission credits Moaaz Taha (0xStorm).",
  },
  {
    year: "2020",
    id: "CVE-2020-25362",
    title: "Online Shopping Alphaware 1.0 — SQL injection",
    summary:
      "The id parameter in the product-details route was vulnerable to error-based blind SQL injection.",
    nvd: "https://nvd.nist.gov/vuln/detail/CVE-2020-25362",
    evidence: "https://www.exploit-db.com/exploits/48771",
    evidenceLabel: "Exploit-DB 48771",
    credit: "The referenced submission credits Moaaz Taha (0xStorm).",
  },
  {
    year: "2020",
    id: "CVE-2020-24862",
    title: "Pharmacy Medical Store and Sale Point 1.0 — SQL injection",
    summary:
      "The catID parameter in the inventory route was vulnerable to time-based blind SQL injection.",
    nvd: "https://nvd.nist.gov/vuln/detail/CVE-2020-24862",
    evidence: "https://www.exploit-db.com/exploits/48752",
    evidenceLabel: "Exploit-DB 48752",
    credit: "The referenced submission credits Moaaz Taha (0xStorm).",
  },
];
