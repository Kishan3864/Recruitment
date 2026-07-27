import type { IndustryContent } from "@/types/content";

export const industries: IndustryContent[] = [
  {
    slug: "technology",
    name: "Technology & IT",
    icon: "cpu",
    order: 1,
    placementCount: 1400,
    shortDesc:
      "Engineers, product, data and infrastructure talent for startups, GCCs and enterprise IT — screened by technologists, not keyword filters.",
    longDesc: [
      "Technology hiring fails when recruiters can't tell a framework from a buzzword. Our technology desk is staffed by former engineers and technical recruiters who screen for real capability: system design thinking, code quality and the ability to ship.",
      "We place across the full stack — frontend, backend, mobile, data engineering, DevOps, security, QA, product management and design — from seed-stage startups building their first team to global capability centres hiring in the hundreds.",
    ],
    roles: [
      "Full-stack, frontend & backend engineers",
      "Data engineers & data scientists",
      "DevOps, SRE & cloud architects",
      "Product managers & product designers",
      "QA & automation engineers",
      "Engineering managers & CTOs",
    ],
    metaTitle: "Technology & IT Recruitment",
    metaDescription:
      "Specialist tech recruiters placing engineers, product, data and infrastructure talent for startups, GCCs and enterprises across India.",
  },
  {
    slug: "banking-finance",
    name: "Banking & Financial Services",
    icon: "landmark",
    order: 2,
    placementCount: 900,
    shortDesc:
      "From credit analysts to CFOs — compliant, confidential hiring for banks, NBFCs, fintechs and wealth management firms.",
    longDesc: [
      "Financial services hiring demands discretion, regulatory awareness and absolute accuracy in vetting. Our BFSI practice serves banks, NBFCs, fintechs, insurers and wealth managers with recruiters who understand the difference between a credit risk role and a market risk role.",
      "Background verification is deeper by default for this sector: employment history, education, credit standing and regulatory database checks are all part of our standard screen for financial roles.",
    ],
    roles: [
      "Credit, risk & compliance professionals",
      "Finance controllers & CFOs",
      "Investment & wealth advisors",
      "Fintech product & growth teams",
      "Actuarial & underwriting specialists",
      "Treasury & audit professionals",
    ],
    metaTitle: "Banking & Financial Services Recruitment",
    metaDescription:
      "Confidential, compliance-first recruitment for banks, NBFCs, fintechs and wealth managers — from analysts to CFOs.",
  },
  {
    slug: "healthcare",
    name: "Healthcare & Life Sciences",
    icon: "heart-pulse",
    order: 3,
    placementCount: 700,
    shortDesc:
      "Clinical and non-clinical talent for hospitals, diagnostics, pharma and medical devices — with licence and credential verification built in.",
    longDesc: [
      "In healthcare, a bad hire is a patient-safety issue. Every clinical candidate we present has licences, registrations and credentials verified directly with issuing bodies before you ever see their profile.",
      "We support hospitals, diagnostic chains, pharmaceutical companies and medical device manufacturers with everything from staff nurses and lab technologists to medical directors, regulatory affairs specialists and hospital administrators.",
    ],
    roles: [
      "Staff nurses & nursing supervisors",
      "Medical officers & specialists",
      "Lab & radiology technologists",
      "Pharma sales & regulatory affairs",
      "Hospital administration & operations",
      "Clinical research associates",
    ],
    metaTitle: "Healthcare & Life Sciences Recruitment",
    metaDescription:
      "Credential-verified clinical and non-clinical hiring for hospitals, diagnostics, pharma and medical devices.",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Engineering",
    icon: "factory",
    order: 4,
    placementCount: 850,
    shortDesc:
      "Plant leadership, production engineers and skilled supervisors for auto, FMCG, chemicals and heavy engineering.",
    longDesc: [
      "Manufacturing recruitment is about finding people who thrive on the shop floor, not just on paper. Our industrial desk places production, quality, maintenance, EHS and plant leadership roles across automotive, FMCG, chemicals, textiles and heavy engineering.",
      "We maintain talent pipelines near every major industrial corridor — Pune, Chennai, Sanand, Hosur, Rudrapur and the NCR belt — so plant-level roles fill quickly with candidates who won't relocate away in six months.",
    ],
    roles: [
      "Plant heads & operations managers",
      "Production & process engineers",
      "Quality (QA/QC) & Six Sigma specialists",
      "Maintenance & reliability engineers",
      "EHS officers & safety managers",
      "Supply chain & stores supervisors",
    ],
    metaTitle: "Manufacturing & Engineering Recruitment",
    metaDescription:
      "Plant leadership, production engineers and skilled supervisors for automotive, FMCG, chemicals and heavy engineering corridors.",
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    icon: "shopping-bag",
    order: 5,
    placementCount: 600,
    shortDesc:
      "Category, growth, operations and store leadership for D2C brands, marketplaces and organised retail chains.",
    longDesc: [
      "Retail and e-commerce move at consumer speed, and hiring has to keep up. We build teams for D2C brands, marketplaces, quick-commerce players and organised retail — from category managers and growth marketers to city operations heads and store leadership.",
      "Our consumer desk tracks the talent flows between major players in real time, which means realistic salary guidance and candidates who are genuinely open — not just window-shopping.",
    ],
    roles: [
      "Category & merchandising managers",
      "Growth & performance marketers",
      "City & zonal operations heads",
      "Store & cluster managers",
      "Marketplace & vendor managers",
      "Customer experience leaders",
    ],
    metaTitle: "Retail & E-commerce Recruitment",
    metaDescription:
      "Category, growth, operations and store leadership hiring for D2C brands, marketplaces and organised retail.",
  },
  {
    slug: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    icon: "truck",
    order: 6,
    placementCount: 500,
    shortDesc:
      "Warehouse, transport, planning and network design talent that keeps goods — and businesses — moving.",
    longDesc: [
      "Supply chains are only as strong as the people running them. We place demand planners, warehouse leaders, transport managers and network design specialists for 3PLs, express logistics, cold chain and in-house supply chain teams.",
      "From a single warehouse shift-in-charge to a national logistics head, our candidates come vetted for the operational judgement this sector demands — because our recruiters have walked the warehouses themselves.",
    ],
    roles: [
      "Supply chain & demand planners",
      "Warehouse & fulfilment-centre managers",
      "Transport & fleet managers",
      "Network design & solutions specialists",
      "Last-mile operations leaders",
      "Procurement & vendor managers",
    ],
    metaTitle: "Logistics & Supply Chain Recruitment",
    metaDescription:
      "Warehouse, transport, planning and network design recruitment for 3PLs, express logistics, cold chain and in-house teams.",
  },
  {
    slug: "sales-marketing",
    name: "Sales & Marketing",
    icon: "megaphone",
    order: 7,
    placementCount: 750,
    shortDesc:
      "Quota-carrying sales talent and full-funnel marketers — assessed on track record, not just interview polish.",
    longDesc: [
      "Anyone can interview well; fewer can consistently hit quota. Our sales and marketing desk verifies actual performance — targets carried, targets achieved, deal sizes, retention — before a candidate reaches your shortlist.",
      "We cover enterprise and SMB sales, channel and alliances, inside sales, brand and performance marketing, product marketing and marketing leadership across B2B and B2C businesses.",
    ],
    roles: [
      "Enterprise & SMB account executives",
      "Regional & national sales heads",
      "Channel & alliance managers",
      "Brand & performance marketers",
      "Product marketing managers",
      "CMOs & growth leaders",
    ],
    metaTitle: "Sales & Marketing Recruitment",
    metaDescription:
      "Performance-verified sales and marketing hiring — from quota-carrying account executives to CMOs.",
  },
  {
    slug: "education",
    name: "Education & EdTech",
    icon: "graduation-cap",
    order: 8,
    placementCount: 350,
    shortDesc:
      "Academic leadership, faculty and edtech product teams for institutions and learning platforms.",
    longDesc: [
      "Education hiring blends mission with rigour. We support K-12 schools, higher-education institutions, test-prep companies and edtech platforms in hiring faculty, academic leadership, curriculum designers, counsellors and the product teams that build learning experiences.",
      "Background checks for education roles include credential verification and child-safety screening as standard, because trust is non-negotiable where learners are involved.",
    ],
    roles: [
      "Principals & academic directors",
      "Faculty & subject-matter experts",
      "Curriculum & instructional designers",
      "Admissions & counselling teams",
      "EdTech product & content teams",
      "Training & L&D specialists",
    ],
    metaTitle: "Education & EdTech Recruitment",
    metaDescription:
      "Academic leadership, faculty and edtech product hiring with credential verification and child-safety screening as standard.",
  },
];
