export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProofLink {
  label: string;
  /** Omitted when the proof is not linkable — the label then says so honestly. */
  url?: string;
}

export interface ProjectVideo {
  src: string;
  poster?: string;
}

export interface Project {
  slug: string;
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  fullDescription?: string;
  tags?: string[];
  proofLinks?: ProofLink[];
  images?: ProjectImage[];
  videos?: ProjectVideo[];
  featured?: boolean;
  /** Maker builds — shown under "Off the clock, on the bench", not in the work grid. */
  bench?: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    slug: "tblx",
    _id: "fallback-tblx",
    title: "One month of Excel \u2192 seven seconds",
    subtitle: "tb.lx / Daimler \u2014 e-bus charging optimizer",
    description:
      "Public-transport tenders were answered with about a month of Excel per network \u2014 timetables, battery capacity, opportunity charging, all by hand. Replaced with an OptaPlanner (Timefold) model that schedules several hundred e-buses in under seven seconds. It became a product of Daimler's public-transport division and a differentiator in every tender since.",
    fullDescription:
      "Public-transport tenders were answered with about a month of Excel per network \u2014 timetables, battery capacity, opportunity charging, all by hand. Replaced with an OptaPlanner (Timefold) model that schedules several hundred e-buses in under seven seconds.\n\nThe model handles transportation networks, timetables, battery capacity and opportunity-charging constraints, including battery degradation, charging infrastructure limits, and passenger demand across heterogeneous fleets.\n\nBuilt as a product for Daimler's public transport division (EvoBus), enabling real-time digital planning that transformed how transport operators responded to RFPs. The product became a core differentiator for tb.lx in the public transport market.",
    tags: ["Optimization", "Java", "Timefold", "EV", "Product"],
    proofLinks: [
      {
        label: "How the team ran \u2014 Medium",
        url: "https://medium.com/tblx-insider/kanban-the-alternative-path-to-agility-55ef6c13e25c",
      },
    ],
    images: [],
    featured: true,
    order: 5,
  },
  {
    slug: "visionbox",
    _id: "fallback-visionbox",
    title: "A physical test lab \u2192 a synthetic dataset",
    subtitle: "Vision-Box \u2014 fraud detection for eGates",
    description:
      "Border-control eGates were validated against ICAO norms by physically simulating every passage type \u2014 babies carried, U-turns, doors jumped \u2014 for each product variant. During the middleware refactoring, replaced the passage-fraud state machine with a neural network and built a synthetic training framework from side-camera silhouettes, so thousands of scenarios became generated data instead of hardware time. Vision-Box was later acquired by Amadeus for \u20ac320M \u2014 the company's outcome; the middleware and the fraud model were mine.",
    fullDescription:
      "During a major middleware refactoring for automated border control eGates, replaced a state machine with a neural network for passage fraud detection. Built a synthetic training framework using side-facing camera silhouettes to trigger sensors virtually \u2014 eliminating the need to physically simulate every passage type the ICAO norms require (passengers carrying babies, U-turns, jumping doors) for each product variant.\n\nThis approach drastically reduced testing time and hardware costs while improving fraud detection accuracy. The synthetic data pipeline generated thousands of training scenarios programmatically, covering edge cases that were previously impractical to test physically.\n\nVision-Box was acquired by Amadeus for \u20ac320M. That is the company's outcome; my work was the middleware refactoring and the fraud-detection model inside it.",
    tags: [".NET", "C++", "gRPC", "ML", "Biometrics"],
    proofLinks: [
      {
        label: "Acquired by Amadeus for \u20ac320M \u2014 public record",
        url: "https://amadeus.com/en/newsroom/press-releases/vision-box-biometrics-acquisition-complete",
      },
      { label: "Project one-pager", url: "/projects/visionbox/one-pager.pptx" },
    ],
    images: [],
    featured: true,
    order: 4,
  },
  {
    slug: "comut",
    _id: "fallback-comut",
    title: "Paper fleet logs \u2192 \u20ac3M ARR, acquired",
    subtitle: "Com-UT \u2014 fleet SaaS, co-founder & CTO",
    description:
      "Fleet management in 2004 ran on phone calls and paper logs. We built the SaaS that replaced them \u2014 GPRS tracking, CANbus diagnostics, driver behavior analytics, predictive maintenance on a MongoDB pipeline \u2014 scaled it to 28 people and \u20ac3M ARR, and sold it to a French industrial group.",
    fullDescription:
      "Com-UT was a SaaS platform for fleet management that I co-founded and led as CTO.\n\n**Product:**\n- Real-time vehicle tracking via GPRS connectivity\n- CANbus integration for deep vehicle diagnostics\n- Driver behavior analytics (speeding, harsh braking, fuel consumption)\n- Predictive maintenance scheduling based on vehicle telemetry\n- MongoDB-backed data pipeline handling thousands of events per second\n\n**Growth:**\n- Scaled from founding team to 28 employees\n- Reached \u20ac3M Annual Recurring Revenue\n- Client base across logistics, construction, and public transport sectors\n\n**Outcome:**\n- Acquired by a French industrial group\n- Technology and team integrated into the acquirer's digital transformation division",
    tags: ["SaaS", "GPRS", "CANbus", "MongoDB"],
    proofLinks: [
      { label: "Acquired by a French industrial group \u2014 reference on request" },
    ],
    images: [
      { src: "/projects/comut/comut-01.jpg", alt: "Com-UT - product backlog" },
    ],
    featured: false,
    order: 9,
  },
  {
    slug: "nesto",
    _id: "fallback-nesto",
    title: "The gas bottle \u2192 a sensor network",
    subtitle: "NESTO \u2014 IoT platform, founder",
    description:
      "Bottled-gas logistics ran on drivers eyeballing racks. Built the whole stack: an NB-IoT scale for weight and temperature, a vibro-acoustic rack sensor for removal and replenishment (patent filed), Prophet demand forecasting, route optimization. Twenty prototypes in the field. Hackaday wrote up the polyurethane-printed enclosure.",
    fullDescription:
      "NESTO was an end-to-end IoT platform for bottled gas distribution, combining hardware design, connectivity, cloud infrastructure, and machine learning.\n\n**Hardware Products:**\n- NB-IoT connected scale measuring weight and temperature of gas bottles in real-time\n- Vibro-acoustic rack sensor detecting bottle removal and replenishment events\n- Originally designed on SIGFOX, later migrated to NB-IoT for better coverage and bidirectional communication\n\n**Software Platform:**\n- Cloud-based dashboard for distributors and gas companies\n- Demand forecasting using Prophet (Facebook's ML library)\n- Route optimization based on real-time inventory levels\n- Automated alerts for low stock and anomalies\n\n**Achievements:**\n- 20 field prototypes deployed across multiple pilot customers\n- 1 patent filed on the vibro-acoustic detection technology\n- Featured on Hackaday for innovative use of polyurethane 3D printing in enclosure design\n- Selected for the Brinc IoT accelerator program\n- Winner of multiple innovation challenges (ENGIE, ALTICE IoT Challenge)",
    tags: ["IoT", "Startup", "NB-IoT", "ML", "Prophet"],
    proofLinks: [
      {
        label: "Hackaday article",
        url: "https://hackaday.com/2017/09/03/polyurethane-meet-3d-printing/",
      },
      {
        label: "hackaday.io",
        url: "https://hackaday.io/project/26941-nesto-prototyping",
      },
      { label: "1 patent filed \u2014 vibro-acoustic detection" },
    ],
    images: [],
    featured: true,
    order: 6,
  },
  {
    slug: "eu-commission",
    _id: "fallback-eu",
    title: "A question of many borders \u2192 a published study",
    subtitle: "European Commission \u2014 tobacco track & trace",
    description:
      "The Commission needed to know whether tobacco could be tracked and traced across member states. I did the technical research \u2014 serialization and authentication architectures, cross-border coordination \u2014 behind the published feasibility study that became the reference for national implementations.",
    fullDescription:
      "Contributed to the European Commission's tobacco track-and-trace initiative as a freelance technical consultant. The project was part of the broader EU Tobacco Products Directive (TPD) implementation.\n\n**Scope of Work:**\n- Technical research on track-and-trace system architectures\n- Policy analysis supporting the EU's illicit trade monitoring framework\n- Evaluation of serialization and authentication technologies\n- Cross-border coordination analysis across member states\n\n**Deliverables:**\n- Contributed to the official EU report on track-and-trace feasibility studies\n- Technical recommendations for the EU-wide system specification\n\nThe resulting framework became a reference for member states implementing national track-and-trace systems.",
    tags: ["EU", "Research", "Policy"],
    proofLinks: [
      {
        label: "The EU study, published",
        url: "https://health.ec.europa.eu/system/files/2016-11/2015_tpd_tracking_tracing_frep_en_0.pdf",
      },
    ],
    images: [],
    featured: false,
    order: 8,
  },
  {
    slug: "owlo",
    _id: "fallback-owlo",
    title: "An alarm you cannot see",
    subtitle: "OWLO \u2014 SIGFOX bicycle security",
    description:
      "An invisible SIGFOX-connected bicycle alarm inside the seat post \u2014 long range, 1+ year battery, BLE mobile app. Finalist at Shark Tank Portugal and the ENGIE Singapore OpenInnov Challenge. Finalist, not a shipped product \u2014 listed because the build is real.",
    fullDescription:
      "OWLO was a smart, invisible bicycle alarm system designed to combat bike theft through IoT technology.\n\n**Product Features:**\n- Completely invisible when installed inside the seat post\n- SIGFOX connectivity for long-range alerts (up to several kilometers)\n- BLE (Bluetooth Low Energy) for smartphone pairing and configuration\n- 1+ year battery life on a single charge\n- Mobile app for real-time alerts, geolocation, and status monitoring\n- Tamper detection with instant notification\n\n**Recognition:**\n- Finalist at Shark Tank Portugal\n- Finalist at ENGIE Singapore OpenInnov Challenge\n- Showcased at Productized.co hardware workshop\n\n**Technology Stack:**\n- Custom PCB design with SIGFOX module\n- Firmware in C (ARM Cortex-M)\n- iOS/Android companion app via BLE\n- Cloud backend for fleet management and alert routing",
    tags: ["IoT", "SIGFOX", "Hardware", "Startup"],
    proofLinks: [
      {
        label: "Pitch deck (ENGIE Singapore)",
        url: "/owlo-presentation-engie-singapore.pptx",
      },
    ],
    images: [
      { src: "/projects/owlo/owlo-01.jpg", alt: "OWLO alarm - keyring rendering" },
      { src: "/projects/owlo/owlo-02.jpg", alt: "OWLO alarm - casing rendering" },
      { src: "/projects/owlo/owlo-03.jpg", alt: "OWLO alarm - product photo" },
      { src: "/projects/owlo/owlo-04.jpg", alt: "OWLO - companion app screens" },
      { src: "/projects/owlo/owlo-05.jpg", alt: "OWLO - four-screen app flow" },
      { src: "/projects/owlo/owlo-06.jpg", alt: "OWLO - watching-mode screen" },
      { src: "/projects/owlo/owlo-07.jpg", alt: "OWLO alarm - photo" },
      { src: "/projects/owlo/owlo-08.jpg", alt: "OWLO alarm - photo" },
    ],
    featured: false,
    order: 7,
  },
  {
    slug: "innotech-fujitsu",
    _id: "fallback-innotech-fujitsu",
    title: "The logic kept, the risk retired",
    subtitle: "InnoTech / Fujitsu \u2014 COBOL POS modernization",
    description:
      "Led the modernization of legacy COBOL point-of-sale systems for Fujitsu retail clients. The business-critical logic was preserved exactly; the integration layers around it were replaced, and maintainability improved. Old code is an asset; the risk around it is the liability.",
    fullDescription:
      "Led the modernization of legacy COBOL point-of-sale systems for Fujitsu retail clients. Carefully preserved business-critical logic while introducing modern integration layers and improving system maintainability.",
    tags: ["COBOL", "Retail", "Legacy"],
    proofLinks: [
      { label: "Client references on request (Jer\u00f3nimo Martins, Staples)" },
    ],
    images: [
      { src: "/projects/innotech-fujitsu/innotech-fujitsu-01.jpg", alt: "Fujitsu POS modernization - screen 1" },
      { src: "/projects/innotech-fujitsu/innotech-fujitsu-02.jpg", alt: "Fujitsu POS modernization - screen 2" },
    ],
    featured: false,
    order: 3,
  },
  {
    slug: "innotech-ikea",
    _id: "fallback-innotech-ikea",
    title: "The process, mapped",
    subtitle: "InnoTech / IKEA \u2014 PLM in BPMN",
    description:
      "Mapped and optimized IKEA's Product Lifecycle Management processes using BPMN modeling and process mining. Identified bottlenecks and automation opportunities across the global supply chain.",
    fullDescription:
      "Mapped and optimized IKEA's Product Lifecycle Management processes using BPMN modeling and process mining techniques. Identified bottlenecks and automation opportunities across the global supply chain.",
    tags: ["PLM", "BPMN", "Process Mining"],
    proofLinks: [{ label: "BPMN artifacts \u2014 reference on request" }],
    images: [],
    featured: false,
    order: 2,
  },
  {
    slug: "innotech-vwfs",
    _id: "fallback-innotech-vwfs",
    title: "The monthly close, automated",
    subtitle: "InnoTech / VW Financial Services \u2014 PowerBI + AI agents",
    description:
      "Accounting and treasury still close through manual Power Query rituals. Replacing them with PowerBI pipelines and AI agents. In progress \u2014 no receipt yet; the receipt will be the close time when it's done.",
    fullDescription:
      "Leading simplification, automation & optimization of accounting and treasury operations using PowerBI, Power Query and AI Agents for VW Financial Services.",
    tags: ["PowerBI", "Power Query", "AI Agents", "Finance"],
    proofLinks: [{ label: "In progress \u2014 no receipt yet" }],
    images: [],
    featured: false,
    order: 1,
  },
  {
    slug: "autoseverity",
    _id: "fallback-autoseverity",
    title: "The ICU, scored in real time",
    subtitle: "AutoSeverity \u2014 clinical decision support, Luz Sa\u00fade",
    description:
      "Clinical decision-support for Luz Sa\u00fade: patient severity scored from electronic health records, HL7/FHIR interoperability with LOINC-coded labs, real-time indicators dashboard for clinicians.",
    fullDescription:
      "AutoSeverity is a clinical decision-support system built for Luz Sa\u00fade, scoring patient severity from electronic health record data and surfacing it through a real-time indicators dashboard.\n\n"
      + "**Key work:**\n"
      + "- Discovery and indicator mapping with clinical stakeholders\n"
      + "- Healthcare interoperability via HL7 and FHIR, with LOINC-coded labs\n"
      + "- Architecture proposal and Figma-designed clinician UI",
    tags: ["Healthcare", "HL7/FHIR", "Analytics", "Decision Support"],
    images: [
      { src: "/projects/autoseverity/graph-indicadores.gif", alt: "AutoSeverity - indicators dashboard" },
      { src: "/projects/autoseverity/autoseverity-figma-page1.jpg", alt: "AutoSeverity - Figma UI design" },
    ],
    featured: false,
    order: 14,
  },
  // --- Off the clock, on the bench: maker builds ---
  {
    slug: "3d-print-showcase",
    _id: "fallback-3d-print-showcase",
    title: "3D Printing Showcase",
    subtitle: "Personal maker projects, 2015\u20132019",
    description:
      "A selection of 3D-printed designs, enclosures and experiments from my home workshop \u2014 functional parts, iterative prototypes and finished builds refined over four years of printing.",
    tags: ["3D Printing", "Maker", "Fusion 360", "Design"],
    images: [
      { src: "/projects/3d-print-showcase/3d-print-showcase-01.jpg", alt: "3D printing showcase - printed part" },
      { src: "/projects/3d-print-showcase/3d-print-showcase-02.jpg", alt: "3D printing showcase - printed part" },
      { src: "/projects/3d-print-showcase/3d-print-showcase-03.jpg", alt: "3D printing showcase - printed part" },
      { src: "/projects/3d-print-showcase/3d-print-showcase-04.jpg", alt: "3D printing showcase - printed part" },
      { src: "/projects/3d-print-showcase/3d-print-showcase-05.jpg", alt: "3D printing showcase - printed part" },
      { src: "/projects/3d-print-showcase/3d-print-showcase-06.jpg", alt: "3D printing showcase - printed part" },
    ],
    videos: [
      { src: "/projects/3d-print-showcase/clip.mp4", poster: "/projects/3d-print-showcase/poster.jpg" },
    ],
    bench: true,
    featured: false,
    order: 10,
  },
  {
    slug: "voron-raven",
    _id: "fallback-voron-raven",
    title: "Voron 2.4 Raven",
    subtitle: "Custom CoreXY 3D printer build",
    description:
      "Sourced, wired and tuned a custom Voron 2.4 \u2014 a high-speed CoreXY printer built from the open-source design. Frame fabrication, electronics integration, Klipper firmware tuning and iterative print-quality calibration.",
    tags: ["3D Printing", "Voron", "CoreXY", "Klipper", "Maker"],
    images: [
      { src: "/projects/voron-raven/voron-raven-01.jpg", alt: "Voron 2.4 Raven build" },
      { src: "/projects/voron-raven/voron-raven-02.jpg", alt: "Voron 2.4 Raven build" },
      { src: "/projects/voron-raven/voron-raven-03.jpg", alt: "Voron 2.4 Raven build" },
      { src: "/projects/voron-raven/voron-raven-04.jpg", alt: "Voron 2.4 Raven build" },
      { src: "/projects/voron-raven/voron-raven-05.jpg", alt: "Voron 2.4 Raven build" },
      { src: "/projects/voron-raven/voron-raven-06.jpg", alt: "Voron 2.4 Raven build" },
    ],
    videos: [
      { src: "/projects/voron-raven/clip.mp4", poster: "/projects/voron-raven/poster.jpg" },
    ],
    bench: true,
    featured: false,
    order: 11,
  },
  {
    slug: "chocofi-magnet",
    _id: "fallback-chocofi-magnet",
    title: "Chocofi Magnetic Edition",
    subtitle: "Custom Hall-effect mechanical keyboard",
    description:
      "A low-profile Chocofi keyboard with magnetic (Hall-effect) switches enabling rapid-trigger actuation. Custom PCB, hand-soldered, 3D-printed case, QMK/VIA firmware.",
    tags: ["Keyboard", "Hall-Effect", "Electronics", "QMK", "Maker"],
    images: [
      { src: "/projects/chocofi-magnet/chocofi-magnet-01.jpg", alt: "Chocofi magnetic keyboard - build photo" },
      { src: "/projects/chocofi-magnet/chocofi-magnet-02.jpg", alt: "Chocofi magnetic keyboard - build photo" },
      { src: "/projects/chocofi-magnet/chocofi-magnet-03.gif", alt: "Chocofi magnetic keyboard - animation" },
    ],
    bench: true,
    featured: false,
    order: 12,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
