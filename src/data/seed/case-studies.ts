import type { CaseStudyContent } from "@/types/content";

export const caseStudies: CaseStudyContent[] = [
  {
    slug: "gcc-engineering-scale-up",
    client: "Global Retail GCC",
    industry: "Technology",
    headline: "120 engineers in 6 months for a new Pune capability centre",
    summary:
      "A Fortune-200 retailer needed to stand up its India engineering centre from zero — without compromising its hiring bar.",
    challenge: [
      "The client had committed to its board that a 120-person Pune engineering centre would be operational within two quarters. They had no local employer brand, no India TA team, and a hiring bar calibrated to their US organisation.",
      "Early attempts with three generalist agencies had produced high volumes of poorly matched profiles, burning hiring-manager hours and slowing everything down.",
    ],
    solution: [
      "We deployed an embedded RPO pod: two sourcers, three technical recruiters and a delivery lead working under the client's brand, backed by our technology talent network.",
      "A calibration sprint in week one aligned our screeners to the client's bar using their actual interview rubrics. We rebuilt the funnel around structured pre-assessments so hiring managers only met candidates with a 70%+ predicted pass rate.",
      "A weekly analytics review tracked funnel conversion, source performance and offer-decline reasons, letting us fix drop-off points in near real time.",
    ],
    results: [
      "124 engineers hired in 24 weeks — two weeks ahead of the board commitment",
      "Interview-to-offer ratio improved from 11:1 to 4.2:1",
      "Offer-decline rate held at 9% against a market norm above 30%",
      "First-year attrition of 6% — less than half the city benchmark",
    ],
    metrics: [
      { value: "124", label: "hires in 6 months" },
      { value: "4.2:1", label: "interview-to-offer ratio" },
      { value: "9%", label: "offer-decline rate" },
      { value: "6%", label: "first-year attrition" },
    ],
    metaTitle: "Case Study: 120-Engineer GCC Build-out",
    metaDescription:
      "How an embedded RPO pod hired 124 engineers in 24 weeks for a Fortune-200 retailer's new Pune capability centre.",
  },
  {
    slug: "nbfc-leadership-rebuild",
    client: "Mid-size NBFC",
    industry: "Banking & Financial Services",
    headline: "A confidential CXO rebuild that the market never saw coming",
    summary:
      "Following a strategic pivot, an NBFC needed to replace three of its five CXOs — quietly, quickly, and without spooking regulators or investors.",
    challenge: [
      "A strategy pivot from unsecured to secured lending meant the client's CRO, CTO and Head of Collections no longer fit the road ahead. Any public search would have alarmed investors, regulators and the very leaders still in seat.",
      "Each role demanded rare combinations — a CRO with secured-book depth and RBI relationships; a CTO who had rebuilt legacy loan-management systems; a collections head with field-force transformation experience.",
    ],
    solution: [
      "Our executive search practice ran all three mandates in parallel under strict confidentiality — the client's name was revealed only after signed NDAs at the second conversation.",
      "We mapped 140+ leaders across lending institutions, approached 43, and ran deep evaluation: psychometric profiling, case-based panels with the board, and 360-degree referencing through back channels.",
      "Offers were sequenced so all three leaders could be announced together as a planned leadership evolution — controlling the narrative completely.",
    ],
    results: [
      "All three CXOs placed within nine weeks of mandate start",
      "Zero market leakage — the announcement was the first public signal",
      "All three leaders in seat past the two-year mark",
      "Secured book grew 3.4× in the 18 months post-transition",
    ],
    metrics: [
      { value: "3", label: "CXOs placed in parallel" },
      { value: "9 wks", label: "mandate to acceptance" },
      { value: "0", label: "confidentiality breaches" },
      { value: "3.4×", label: "secured book growth after" },
    ],
    metaTitle: "Case Study: Confidential CXO Rebuild",
    metaDescription:
      "Three parallel confidential executive searches completed in nine weeks for an NBFC's strategic pivot — with zero market leakage.",
  },
  {
    slug: "hospital-icu-staffing",
    client: "Quaternary Care Hospital Chain",
    industry: "Healthcare",
    headline: "Staffing a 40-bed ICU expansion without a single agency nurse",
    summary:
      "A hospital chain opening a new critical-care tower needed 85 verified clinical staff on payroll before commissioning day.",
    challenge: [
      "The new tower's commissioning date was fixed — NABH inspection included — and the chain refused to open with temporary agency nurses. Every hire needed licence verification, credential checks and structured clinical assessment.",
      "Critical-care nurses are among the scarcest talent pools in Indian healthcare, and the client's location faced competition from two newer hospitals offering sign-on bonuses.",
    ],
    solution: [
      "We activated our healthcare talent network across five states, prioritising nurses from the client's alumni network and those seeking to relocate near family — motivations stronger than sign-on bonuses.",
      "Our clinical screening panel — staffed by senior nursing consultants — ran structured skill assessments, while our verification team confirmed every licence directly with state nursing councils.",
      "We proposed a preceptorship-based onboarding cohort model that let the client absorb 20 nurses at a time, protecting care quality during ramp-up.",
    ],
    results: [
      "85 clinical staff on payroll 3 weeks before commissioning",
      "100% licence and credential verification, zero exceptions",
      "NABH inspection cleared on first attempt",
      "92% retention at the one-year mark",
    ],
    metrics: [
      { value: "85", label: "clinical hires before day one" },
      { value: "100%", label: "credentials verified" },
      { value: "3 wks", label: "buffer before commissioning" },
      { value: "92%", label: "one-year retention" },
    ],
    metaTitle: "Case Study: 40-Bed ICU Staffing",
    metaDescription:
      "85 licence-verified clinical staff hired before commissioning day for a quaternary hospital's ICU expansion — with 92% one-year retention.",
  },
];
