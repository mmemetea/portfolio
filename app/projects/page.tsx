import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/lib/queries";
import Container from "@/components/Container";
import ProjectFilterGrid from "@/components/ProjectFilterGrid";
import type { Project } from "@/components/ProjectFilterGrid";

export const metadata: Metadata = {
  title: "Projects | Michaël Memeteau",
  description: "Verified work with proof of impact",
};

const fallbackProjects: Project[] = [
  {
    _id: "fallback-nesto",
    title: "NESTO.IO",
    subtitle: "IoT Bottled Gas Platform",
    description:
      "End-to-end IoT platform for bottled gas distribution using SIGFOX connectivity. Real-time level monitoring, automated reorder triggers, and predictive analytics deployed across European distributors. Prototyped with 3D-printed sensor enclosures.",
    tags: ["IoT", "Startup", "SIGFOX", "AWS"],
    proofLinks: [
      { label: "Hackaday Article", url: "https://hackaday.com" },
      { label: "hackaday.io", url: "https://hackaday.io" },
      { label: "Competition Wins", url: "#" },
    ],
    order: 1,
  },
  {
    _id: "fallback-comut",
    title: "ComUT",
    subtitle: "Fleet Management SaaS",
    description:
      "SaaS platform for fleet management leveraging GPRS connectivity and CANbus integration. Provided real-time vehicle tracking, driver behavior analytics, and predictive maintenance scheduling with a MongoDB-backed data pipeline.",
    tags: ["SaaS", "GPRS", "CANbus", "MongoDB"],
    proofLinks: [{ label: "Acquisition", url: "#" }],
    order: 2,
  },
  {
    _id: "fallback-tblx",
    title: "tb.lx / Daimler",
    subtitle: "Digital Service Hub",
    description:
      "Designed and built a cloud-native digital service hub for Daimler's after-sales division. Architected event-driven microservices with Kafka and Spark processing pipelines, delivering measurable results within 30 days.",
    tags: ["Cloud", "Kafka", "Spark", "React", "Azure"],
    proofLinks: [
      { label: "Medium Article", url: "https://medium.com" },
      { label: "30-Day Result", url: "#" },
    ],
    order: 3,
  },
  {
    _id: "fallback-visionbox",
    title: "Vision-Box",
    subtitle: "Biometric Middleware",
    description:
      "Built high-throughput biometric middleware processing millions of identity transactions. Integrated .NET services with C++ performance-critical modules via gRPC, enabling seamless interop across airport and border control systems.",
    tags: [".NET", "C++", "gRPC", "Biometrics"],
    proofLinks: [{ label: "Amadeus Acquisition", url: "#" }],
    order: 4,
  },
  {
    _id: "fallback-eu",
    title: "EU Commission",
    subtitle: "Tobacco Track & Trace",
    description:
      "Contributed to the European Commission's tobacco track-and-trace initiative. Conducted technical research and policy analysis supporting the EU's illicit trade monitoring framework across member states.",
    tags: ["EU", "Research", "Policy"],
    proofLinks: [{ label: "EU Report", url: "#" }],
    order: 5,
  },
  {
    _id: "fallback-innotech-fujitsu",
    title: "InnoTech / Fujitsu",
    subtitle: "COBOL POS Modernization",
    description:
      "Led the modernization of legacy COBOL point-of-sale systems for Fujitsu retail clients. Carefully preserved business-critical logic while introducing modern integration layers and improving system maintainability.",
    tags: ["COBOL", "Retail", "Legacy"],
    proofLinks: [{ label: "Client References", url: "#" }],
    order: 6,
  },
  {
    _id: "fallback-innotech-ikea",
    title: "InnoTech / IKEA",
    subtitle: "PLM Process Mapping",
    description:
      "Mapped and optimized IKEA's Product Lifecycle Management processes using BPMN modeling and process mining techniques. Identified bottlenecks and automation opportunities across the global supply chain.",
    tags: ["PLM", "BPMN", "Process Mining"],
    proofLinks: [{ label: "Ongoing", url: "#" }],
    order: 7,
  },
  {
    _id: "fallback-innotech-luzsaude",
    title: "InnoTech / Luz Saúde",
    subtitle: "ICU Mortality Scores",
    description:
      "Developed FHIR and HL7-compliant interfaces for ICU mortality scoring systems at Luz Saúde hospitals. Ensured regulatory compliance while integrating real-time patient data feeds into clinical decision support tools.",
    tags: ["Healthcare", "FHIR", "HL7"],
    proofLinks: [{ label: "Compliance Project", url: "#" }],
    order: 8,
  },
];

export default async function ProjectsPage() {
  let projects: Project[] = fallbackProjects;

  try {
    const data = await client.fetch(allProjectsQuery);
    if (Array.isArray(data) && data.length > 0) {
      projects = data;
    }
  } catch {
    // Use fallback data when Sanity is unavailable
  }

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Projects
          </h1>
          <p className="mt-3 text-lg text-foreground/60">
            Verified work with proof of impact
          </p>
        </div>
        <ProjectFilterGrid projects={projects} />
      </Container>
    </section>
  );
}
