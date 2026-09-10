"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { getFeaturedProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

export default function FeaturedProjectCards() {
  const featuredProjects: Project[] = getFeaturedProjects();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredProjects.map((project) => {
        const hasImages = project.images && project.images.length > 0;
        const thumbSrc = hasImages
          ? project.images![0].src
          : "/placeholder.svg";
        const thumbAlt = hasImages
          ? project.images![0].alt
          : project.title;
        const firstProof = project.proofLinks?.[0];

        return (
          <article
            key={project._id}
            className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background transition-all hover:border-accent/30 hover:shadow-md"
          >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-foreground/[0.03]">
                <Image
                  src={thumbSrc}
                  alt={thumbAlt}
                  fill
                  className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                    !hasImages ? "opacity-20" : ""
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                  {/* stretched link: ::after fills the card so the whole card is clickable */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {project.title}
                  </Link>
                </h3>
                {project.subtitle && (
                  <p className="mt-1 text-sm text-foreground/60 line-clamp-2">
                    {project.subtitle}
                  </p>
                )}

                {project.description && (
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/50 line-clamp-3">
                    {project.description}
                  </p>
                )}

                {firstProof &&
                  (firstProof.url ? (
                    <a
                      href={firstProof.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent/80"
                    >
                      {firstProof.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="mt-4 inline-flex w-fit text-sm font-medium text-foreground/50">
                      {firstProof.label}
                    </span>
                  ))}
              </div>
            </article>
        );
      })}
    </div>
  );
}
