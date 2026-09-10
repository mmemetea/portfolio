import type { Metadata } from "next";
import Container from "@/components/Container";
import ProjectFilterGrid from "@/components/ProjectFilterGrid";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Work | Michaël Memeteau",
  description: "Transformations, not job titles — every claim with its receipt",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const work = projects.filter((p) => !p.bench);
  const bench = projects.filter((p) => p.bench);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            The work.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-foreground/60">
            Transformations, not job titles. Each card names what became what,
            and links what&rsquo;s linkable.
          </p>
        </div>

        <ProjectFilterGrid projects={work} />

        {bench.length > 0 && (
          <div className="mt-20 border-t border-foreground/10 pt-16">
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Off the clock, on the bench.
              </h2>
              <p className="mt-2 text-foreground/60">
                Where the hardware instincts come from.
              </p>
            </div>
            <ProjectFilterGrid projects={bench} showFilters={false} />
          </div>
        )}
      </Container>
    </section>
  );
}
