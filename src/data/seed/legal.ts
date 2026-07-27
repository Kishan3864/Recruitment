import type { LegalPageContent } from "@/types/content";

export const legalPages: LegalPageContent[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    updatedAt: "2026-06-01",
    intro:
      "Northbridge Talent ('we', 'us') is a recruitment and staffing company. Handling personal data responsibly is fundamental to what we do. This policy explains what we collect, why, and the rights you have over your information.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "We collect information you provide directly when you apply for a role, submit your resume, request our services or contact us:",
        ],
        bullets: [
          "Identity and contact details: name, email address, phone number, city of residence",
          "Professional information: resume/CV, employment history, education, skills, current and expected compensation, notice period, LinkedIn profile",
          "Employer information: company name, role requirements and hiring context, where you enquire as an employer",
          "Communications: messages you send us and records of our conversations with you",
          "Technical data: IP address, browser type and pages visited, collected via cookies subject to your consent",
        ],
      },
      {
        heading: "How we use your information",
        paragraphs: ["We use personal data solely to deliver recruitment and staffing services:"],
        bullets: [
          "Matching candidates with suitable roles and presenting profiles to employers — only with the candidate's explicit per-role consent",
          "Verifying credentials, references, licences and employment history as part of our screening process",
          "Communicating about applications, roles, interviews and offers",
          "Responding to employer enquiries and administering engagements",
          "Meeting legal, statutory and compliance obligations",
          "Improving our website and services, using aggregated, de-identified data",
        ],
      },
      {
        heading: "Consent-first sharing",
        paragraphs: [
          "Your resume and profile are never shared with any employer without your explicit consent for that specific role. We name the employer to you first. We do not sell personal data to anyone, and we do not share it with third parties for their marketing purposes.",
        ],
      },
      {
        heading: "Storage and security",
        paragraphs: [
          "Personal data is stored on encrypted infrastructure hosted in India. Access is restricted to consultants working on your placement or mandate, on a need-to-know basis. Data is encrypted in transit and at rest, and access is logged.",
        ],
      },
      {
        heading: "Retention",
        paragraphs: [
          "Candidate profiles are retained while your consent stands, so we can contact you about future matching roles. If you ask us to delete your data, we remove your profile from our active systems within 30 days, retaining only what law or statutory compliance requires us to keep.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: ["You may at any time:"],
        bullets: [
          "Request a copy of the personal data we hold about you",
          "Correct inaccurate or outdated information",
          "Withdraw consent and request deletion of your profile",
          "Object to specific uses of your data",
          "Raise a grievance about our handling of your information",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "For any privacy request or question, write to hello@northbridgetalent.in with the subject 'Privacy Request'. We respond to all privacy requests within 7 working days.",
        ],
      },
    ],
    metaTitle: "Privacy Policy",
    metaDescription:
      "How Northbridge Talent collects, uses, protects and deletes personal data — including our consent-first profile sharing policy.",
  },
  {
    slug: "terms",
    title: "Terms of Service",
    updatedAt: "2026-06-01",
    intro:
      "These terms govern your use of the Northbridge Talent website and services. By using this website, submitting an application or engaging our services, you agree to them.",
    sections: [
      {
        heading: "Our services",
        paragraphs: [
          "Northbridge Talent provides recruitment, staffing, executive search, recruitment process outsourcing, payroll administration and related advisory services. Service specifics for employers are set out in individual engagement agreements, which prevail over these general terms where they differ.",
        ],
      },
      {
        heading: "For candidates",
        paragraphs: [
          "Our services are provided to candidates free of charge — we never charge candidates a fee at any stage. Submitting an application does not guarantee placement or employment. You are responsible for the accuracy of the information you provide; false credentials or misrepresented experience will end our engagement with you and may be disclosed to affected employers.",
        ],
      },
      {
        heading: "For employers",
        paragraphs: [
          "Candidate profiles are shared in confidence for evaluation against the specific role discussed. Engaging a candidate we introduced — directly or indirectly, within 12 months of introduction — constitutes a placement under the applicable engagement agreement. Fees, guarantees and replacement terms are as set out in that agreement.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: ["When using this website you agree not to:"],
        bullets: [
          "Submit false, misleading or third-party information without authority",
          "Scrape, harvest or bulk-download content or listings",
          "Attempt to breach, probe or circumvent security measures",
          "Use the site to transmit malware or unlawful content",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "All website content — text, design, graphics and branding — belongs to Northbridge Talent and may not be reproduced without written permission, except for personal, non-commercial reference.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "We work diligently to verify candidates and represent roles accurately, but hiring decisions remain the employer's and career decisions remain the candidate's. To the maximum extent permitted by law, our liability in connection with website use is limited, and in connection with services is as defined in the applicable engagement agreement.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of India, with courts in Mumbai having exclusive jurisdiction.",
        ],
      },
    ],
    metaTitle: "Terms of Service",
    metaDescription:
      "The terms governing use of the Northbridge Talent website and recruitment services, for candidates and employers.",
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    updatedAt: "2026-06-01",
    intro:
      "This policy explains how the Northbridge Talent website uses cookies and similar technologies, and the choices you have.",
    sections: [
      {
        heading: "What cookies are",
        paragraphs: [
          "Cookies are small text files placed on your device when you visit a website. They help the site function, remember your preferences and understand how visitors use it.",
        ],
      },
      {
        heading: "Cookies we use",
        paragraphs: ["We keep our cookie use minimal:"],
        bullets: [
          "Essential cookies — required for core site functionality such as form submission and security; these cannot be disabled",
          "Analytics cookies — help us understand page performance and visitor journeys in aggregate; set only with your consent",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can accept or decline non-essential cookies via the consent banner on your first visit, and change your choice at any time by clearing cookies in your browser. Most browsers also let you block cookies entirely, though parts of the site may not function without essential cookies.",
        ],
      },
      {
        heading: "Third-party cookies",
        paragraphs: [
          "Where we embed third-party services (such as analytics), those providers may set their own cookies subject to their own policies. We load such services only after consent.",
        ],
      },
    ],
    metaTitle: "Cookie Policy",
    metaDescription:
      "How the Northbridge Talent website uses essential and analytics cookies, and how to manage your consent.",
  },
];
